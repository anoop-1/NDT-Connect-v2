import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth-service';
import { SignJWT } from 'jose';
import dbConnect from '@/lib/mongodb';
import { ProcedureDraft } from '@/lib/models/ProcedureDraft';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me');

/**
 * Try to "claim" an anonymous ProcedureDraft for a freshly registered user.
 * Silent on failure — registration itself must never fail because of a missing
 * or bad draftId.
 */
async function claimPendingProcedure(
    draftId: string | null,
    userId: string
): Promise<{ id: string; body: string } | null> {
    if (!draftId) return null;
    try {
        await dbConnect();
        const draft = await ProcedureDraft.findById(draftId);
        if (!draft) return null;
        // Already claimed by someone else — leave alone.
        if (draft.userId && draft.userId !== userId) return null;
        draft.userId = userId;
        // Bump expiry — claimed drafts persist 90 days for the new owner.
        draft.expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        await draft.save();
        return { id: String(draft._id), body: draft.body };
    } catch (err) {
        console.error('claimPendingProcedure failed (non-fatal):', err);
        return null;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, role, name, password, profileData, pendingProcedure } = body;

        if (!email || !role || !name || !password) {
            return NextResponse.json(
                { message: 'Missing required fields: email, role, name, password' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        const user = await registerUser({
            email,
            role,
            name,
            password,
            profileData,
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Failed to create user' },
                { status: 500 }
            );
        }

        const safe: any = (user as any).toObject ? (user as any).toObject() : user;
        const responseUser = {
            ...safe,
            id: safe._id?.toString() || safe.id,
        };
        delete responseUser.password;
        delete responseUser.verificationToken;
        delete responseUser.resetPasswordToken;

        const token = await new SignJWT({ userId: responseUser.id, email: responseUser.email, role: responseUser.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        // Resolve pendingProcedure draftId from JSON body OR ?pendingProcedure= query.
        const draftIdFromQuery = request.nextUrl.searchParams.get('pendingProcedure');
        const draftId =
            (typeof pendingProcedure === 'string' && pendingProcedure) ||
            (pendingProcedure && typeof pendingProcedure === 'object' && pendingProcedure.id) ||
            draftIdFromQuery ||
            null;
        const claimed = await claimPendingProcedure(draftId, responseUser.id);

        // IMPORTANT: do NOT change the existing keys on this response shape —
        // mobile clients depend on it. We append `pendingProcedure` only if a
        // claim succeeded.
        const response = NextResponse.json({
            ...responseUser,
            accessToken: token,
            refreshToken: token,
            ...(claimed ? { pendingProcedure: claimed } : {}),
        });
        response.cookies.set('ndt-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return response;
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
