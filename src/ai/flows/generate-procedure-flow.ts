'use server';
/**
 * @fileOverview An AI agent that writes Non-Destructive Testing (NDT) procedures.
 *
 * - generateProcedure - A function that handles the procedure generation process.
 * - GenerateProcedureInput - The input type for the generateProcedure function.
 * - GenerateProcedureOutput - The return type for the generateProcedure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateProcedureInputSchema = z.object({
  testMethod: z.string().describe("The NDT method to be used (e.g., Ultrasonic Testing, Magnetic Particle Testing)."),
  scope: z.string().describe("The scope of the work, including what is being tested and why."),
  equipment: z.string().describe("A list of the primary equipment, including make and model (e.g., Olympus EPOCH 650, Danatronics EHC-09)."),
  consumables: z.string().describe("A list of consumables to be used (e.g., Sonotech Ultragel II, Magnaflux WCP-2, Parker Research B-100 Yoke)."),
  personnelQualification: z.string().describe("The required personnel qualification standard (e.g., SNT-TC-1A, ISO 9712)."),
  acceptanceCriteria: z.string().describe("The standard or specification that defines the acceptance criteria for discovered indications (e.g., API 1104 20th Edition, ASME Sec V Art. 4)."),
});
export type GenerateProcedureInput = z.infer<typeof GenerateProcedureInputSchema>;

export const GenerateProcedureOutputSchema = z.object({
  procedureMarkdown: z.string().describe("The full NDT procedure, formatted as a detailed Markdown document."),
});
export type GenerateProcedureOutput = z.infer<typeof GenerateProcedureOutputSchema>;

export async function generateProcedure(input: GenerateProcedureInput): Promise<GenerateProcedureOutput> {
  return generateProcedureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProcedurePrompt',
  input: {schema: GenerateProcedureInputSchema},
  output: {schema: GenerateProcedureOutputSchema},
  prompt: `You are an expert NDT Level III professional with extensive experience in writing technical procedures for various inspection methods. Your task is to generate a comprehensive, formal Non-Destructive Testing procedure based on the inputs provided. The procedure must be well-structured, clear, and ready for technical review and field use.

The output must be a single string containing the entire procedure formatted in GitHub Flavored Markdown.

Use the following inputs to construct the procedure:
- **Test Method:** {{{testMethod}}}
- **Scope of Work:** {{{scope}}}
- **Primary Equipment:** {{{equipment}}}
- **Consumables:** {{{consumables}}}
- **Personnel Qualification Standard:** {{{personnelQualification}}}
- **Acceptance Criteria Standard:** {{{acceptanceCriteria}}}

The generated procedure must include the following sections, at a minimum:
1.0  **SCOPE**
2.0  **REFERENCES** (List the acceptance criteria and personnel qualification standards here)
3.0  **PERSONNEL QUALIFICATIONS**
4.0  **EQUIPMENT**
5.0  **PROCEDURE / METHOD** (Provide a detailed, step-by-step methodology for performing the test. This should be the most detailed section.)
6.0  **EVALUATION & ACCEPTANCE CRITERIA** (Reference the standard specified and briefly explain its application.)
7.0  **REPORTING**

Structure your response as a valid JSON object following the output schema. The procedure text should be in the 'procedureMarkdown' field.

Example of a step in the procedure section:
"5.1. Calibrate the UT instrument in accordance with the specified standard using appropriate calibration blocks."
`,
});

const generateProcedureFlow = ai.defineFlow(
  {
    name: 'generateProcedureFlow',
    inputSchema: GenerateProcedureInputSchema,
    outputSchema: GenerateProcedureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate a procedure.");
    }
    return output;
  }
);
