import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      testMethod,
      scopeOfWork,
      materialType,
      applicableStandard,
      acceptanceCriteria,
      additionalNotes,
    } = body;

    if (!testMethod || !scopeOfWork) {
      return NextResponse.json(
        { error: 'Test method and scope of work are required.' },
        { status: 400 }
      );
    }

    const prompt = `You are an expert NDT (Non-Destructive Testing) Level III engineer with decades of experience writing inspection procedures compliant with ASNT, ISO, ASME, and API standards.

Generate a comprehensive, professional NDT inspection procedure document based on the following inputs:

**Test Method:** ${testMethod}
**Scope of Work:** ${scopeOfWork}
${materialType ? `**Material Type:** ${materialType}` : ''}
${applicableStandard ? `**Applicable Standard/Code:** ${applicableStandard}` : ''}
${acceptanceCriteria ? `**Acceptance Criteria:** ${acceptanceCriteria}` : ''}
${additionalNotes ? `**Additional Notes:** ${additionalNotes}` : ''}

The procedure must include ALL of the following sections:

1. **TITLE PAGE** - Procedure number, revision, title, date
2. **PURPOSE & SCOPE** - Detailed description of what the procedure covers
3. **REFERENCE DOCUMENTS** - Applicable codes, standards, and specifications
4. **PERSONNEL QUALIFICATIONS** - Required certification levels and training
5. **EQUIPMENT LIST** - All required equipment with specifications
6. **SURFACE PREPARATION** - Pre-inspection surface requirements
7. **CALIBRATION REQUIREMENTS** - Equipment calibration procedures and reference standards
8. **INSPECTION PROCEDURE** - Step-by-step detailed examination instructions
9. **RECORDING & EVALUATION** - How to record findings and evaluate results
10. **ACCEPTANCE CRITERIA** - Pass/fail criteria per applicable code
11. **POST-INSPECTION** - Cleanup, marking, and documentation requirements
12. **REPORTING** - Report format and required information
13. **SAFETY REQUIREMENTS** - Applicable safety precautions
14. **ATTACHMENTS** - Reference tables, forms, and figures needed

Format the output as a professional document using markdown. Use proper headings, numbered lists, and tables where appropriate. Include realistic equipment specifications, calibration parameters, and technical details specific to the chosen NDT method.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const textContent = message.content.find((block) => block.type === 'text');
    const generatedProcedure = textContent?.text || 'Failed to generate procedure.';

    return NextResponse.json({ procedure: generatedProcedure });
  } catch (error: any) {
    console.error('AI Procedure Generation Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate procedure.' },
      { status: 500 }
    );
  }
}
