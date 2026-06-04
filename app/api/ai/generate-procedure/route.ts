import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/mongodb';
import { ProcedureDraft } from '@/lib/models/ProcedureDraft';
import {
  checkAnonRate,
  checkUserRate,
  checkGlobalRate,
  recordSuccessfulCall,
  hashIp,
} from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { JWT_SECRET } from '@/lib/jwt';

const SYSTEM_PROMPT = `You are a senior NDT (Non-Destructive Testing) procedure writer with 25+ years of industry experience. You write comprehensive, technically accurate NDT written procedures that comply with industry codes and standards (ASME Section V, API 1104, AWS D1.1, ASTM, ISO 9712, ASNT SNT-TC-1A, EN 4179, and others as applicable).

When writing a procedure, always structure it with the following numbered sections:
1. Scope and Purpose
2. Applicable Documents and Standards
3. Personnel Qualification Requirements
4. Equipment and Materials
5. Surface/Material Preparation
6. Technique and Setup Parameters
7. Step-by-Step Procedure
8. Calibration Requirements
9. Acceptance/Rejection Criteria
10. Documentation and Reporting Requirements
11. Safety Precautions and Health Hazards

Be specific, technical, and professional. Include specific equipment settings, calibration intervals, sensitivity levels, scanning patterns, and coverage requirements where applicable. Reference the specific standard/code clause numbers when possible.`;

function generateTemplateProcedure(params: {
  testMethod: string;
  scopeOfWork: string;
  materialType?: string;
  applicableStandard?: string;
  acceptanceCriteria?: string;
  additionalNotes?: string;
}): string {
  const { testMethod, scopeOfWork, materialType, applicableStandard, acceptanceCriteria, additionalNotes } = params;
  const standard = applicableStandard || 'ASME Section V';
  const material = materialType || 'carbon steel';
  const date = new Date().toISOString().split('T')[0];

  return `# NDT Written Procedure
## ${testMethod}

**Document No.:** NDTC-PROC-${Date.now().toString(36).toUpperCase()}
**Revision:** 0
**Date:** ${date}
**Applicable Standard:** ${standard}

---

## 1. Scope and Purpose
This procedure establishes the requirements for ${testMethod} of ${scopeOfWork}. This procedure applies to ${material} components and is intended to detect surface and/or volumetric discontinuities in accordance with ${standard}.

## 2. Applicable Documents and Standards
- ${standard}
- ASNT SNT-TC-1A (Personnel Qualification)
- Applicable construction/maintenance code
- Equipment manufacturer's operating manuals

## 3. Personnel Qualification Requirements
- Level I: May perform examinations under the direct supervision of a certified Level II or III
- Level II: Authorized to perform, interpret, evaluate, and report results
- Level III: Responsible for procedure approval and personnel certification
- All personnel shall be certified in accordance with SNT-TC-1A or equivalent

## 4. Equipment and Materials
- ${testMethod} equipment meeting the requirements of ${standard}
- Calibration standards as required by the applicable code
- Couplant or consumable materials as applicable
- Calibration blocks: IIW Type I or equivalent

## 5. Surface/Material Preparation
- Material: ${material}
- Surface shall be free of scale, weld spatter, coatings, and foreign material that could interfere with examination
- Surface temperature: 40°F to 125°F (4°C to 52°C) unless otherwise specified
- Surface condition shall be documented prior to examination

## 6. Technique and Setup Parameters
- Examination coverage: 100% of the required volume/area per ${standard}
- Scanning overlap: Minimum 15% index overlap between passes
- Scanning speed: Maximum as determined during qualification
- Sensitivity setting: Per calibration requirements of ${standard}

## 7. Step-by-Step Procedure
1. Verify equipment is within calibration period
2. Prepare calibration standards
3. Perform initial calibration per ${standard} requirements
4. Apply couplant/media uniformly to examination area
5. Perform scanning in accordance with the applicable technique
6. Re-calibrate at defined intervals and whenever equipment is disturbed
7. Record all indications meeting the recordable level
8. Evaluate all recordable indications against acceptance criteria
9. Mark and document the location of all rejectable indications

## 8. Calibration Requirements
- Initial calibration: Required before examination begins
- Recalibration frequency: Every 2 hours, at end of examination, when equipment is changed, or when examination results are questionable
- Calibration documentation: Serial numbers, date, time, and examiner ID

## 9. Acceptance/Rejection Criteria
${acceptanceCriteria || `Per ${standard} and applicable construction/maintenance code. All indications shall be evaluated in accordance with the acceptance standards specified in the applicable code section. Rejectable indications shall be repaired and re-examined.`}

## 10. Documentation and Reporting Requirements
- Report number, revision, and date
- Procedure number and revision
- Equipment identification (make, model, serial number)
- Examiner name, certification level, and signature
- Material identification and location
- Calibration records
- Results (accept/reject) and disposition
- Sketches or maps showing indication locations

## 11. Safety Precautions
- Follow applicable safety regulations and company safety program
- Use appropriate PPE: safety glasses, gloves, steel-toed boots
- Radiographic testing: Establish radiation boundaries, use dosimetry, comply with all radiation safety requirements
- Proper disposal of consumable materials
- Ensure adequate lighting and working conditions

${additionalNotes ? `\n## Additional Notes\n${additionalNotes}` : ''}

---
*This procedure was generated by NDT Connect AI Procedure Writer. Review and approve per your quality management system before use.*
`;
}

/** Extract userId from either Bearer header or ndt-token cookie. Returns null if anon. */
async function getCallerUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('ndt-token')?.value;
  const token = authHeader?.replace('Bearer ', '') ?? cookieToken;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.userId as string) || null;
  } catch {
    return null;
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return '0.0.0.0';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testMethod, scopeOfWork, materialType, applicableStandard, acceptanceCriteria, additionalNotes } = body;

    if (!testMethod || !scopeOfWork) {
      return NextResponse.json({ error: 'testMethod and scopeOfWork are required' }, { status: 400 });
    }

    // ── Identify caller ───────────────────────────────────────────────────
    const userId = await getCallerUserId(request);
    const ip = getClientIp(request);
    const ua = request.headers.get('user-agent');
    const ipHash = hashIp(ip, ua);

    // ── Global token-bucket guard (Groq quota) ────────────────────────────
    const globalRate = await checkGlobalRate();
    if (!globalRate.allowed) {
      return NextResponse.json(
        {
          message: 'Service is at capacity. Please try again in a minute.',
          resetAt: new Date(Date.now() + 60 * 1000).toISOString(),
        },
        { status: 429 }
      );
    }

    // ── Per-caller guard ──────────────────────────────────────────────────
    let dayRemaining = 0;
    let monthRemaining: number | undefined;
    let resetAt: Date;

    if (userId) {
      const userRate = await checkUserRate(userId);
      if (!userRate.allowed) {
        return NextResponse.json(
          {
            message: 'Daily limit reached (5/day). Resets in 24h.',
            resetAt: userRate.resetAt.toISOString(),
          },
          { status: 429 }
        );
      }
      dayRemaining = userRate.dayRemaining - 1; // about to consume one
      monthRemaining = userRate.monthRemaining - 1;
      resetAt = userRate.resetAt;
    } else {
      const anonRate = await checkAnonRate(ipHash);
      if (!anonRate.allowed) {
        return NextResponse.json(
          {
            message: 'Daily limit reached. Sign up free for 5 per day.',
            resetAt: anonRate.resetAt.toISOString(),
          },
          { status: 429 }
        );
      }
      dayRemaining = 0; // anon gets 1 — once spent, it's zero
      resetAt = anonRate.resetAt;
    }

    // ── Generate ──────────────────────────────────────────────────────────
    const groqApiKey = process.env.GROQ_API_KEY;
    let procedure: string;
    let source: 'groq_ai' | 'template' | 'template_fallback' = 'template';

    if (!groqApiKey) {
      procedure = generateTemplateProcedure({
        testMethod, scopeOfWork, materialType, applicableStandard, acceptanceCriteria, additionalNotes,
      });
      source = 'template';
    } else {
      const userPrompt = `Write a comprehensive NDT written procedure for the following:

Test Method: ${testMethod}
Scope of Work: ${scopeOfWork}
Material Type: ${materialType || 'Carbon steel (general)'}
Applicable Standard/Code: ${applicableStandard || 'ASME Section V'}
Acceptance Criteria: ${acceptanceCriteria || 'Per applicable code'}
Additional Notes: ${additionalNotes || 'None'}

Please write a complete, professional NDT written procedure following all the required sections. Make it technically detailed and specific to the method and scope described.`;

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: 4000,
          temperature: 0.3,
        }),
      });

      if (!groqResponse.ok) {
        const errText = await groqResponse.text();
        console.error('Groq API error:', errText);
        procedure = generateTemplateProcedure({
          testMethod, scopeOfWork, materialType, applicableStandard, acceptanceCriteria, additionalNotes,
        });
        source = 'template_fallback';
      } else {
        const groqData = await groqResponse.json();
        procedure = groqData.choices?.[0]?.message?.content || generateTemplateProcedure({
          testMethod, scopeOfWork, materialType, applicableStandard, acceptanceCriteria, additionalNotes,
        });
        source = 'groq_ai';
      }
    }

    // ── Persist draft + record quota consumption ──────────────────────────
    await dbConnect();
    const draft = await ProcedureDraft.create({
      body: procedure,
      params: { testMethod, scopeOfWork, materialType, applicableStandard, acceptanceCriteria, additionalNotes },
      ipHash,
      userId: userId || null,
      source,
    });

    await recordSuccessfulCall(userId ? 'user' : 'anon', userId || ipHash);

    return NextResponse.json({
      success: true,
      draftId: String(draft._id),
      procedure,
      source,
      remaining: {
        daily: dayRemaining,
        ...(monthRemaining !== undefined ? { monthly: monthRemaining } : {}),
        resetAt: resetAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Procedure generation error:', error);
    return NextResponse.json({ error: 'Failed to generate procedure', details: error.message }, { status: 500 });
  }
}
