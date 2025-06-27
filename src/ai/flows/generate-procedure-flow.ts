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
  testMethod: z.string({ required_error: "Test method is required."}).min(1, "Test method is required."),
  scope: z.string({ required_error: "Scope is required."}).min(10, "Scope must be at least 10 characters long."),
  equipment: z.string({ required_error: "Equipment list is required."}).min(5, "Equipment list must be at least 5 characters long."),
  consumables: z.string({ required_error: "Consumables list is required."}).min(5, "Consumables list must be at least 5 characters long."),
  personnelQualification: z.string({ required_error: "Personnel qualification standard is required."}).min(1, "Personnel qualification standard is required."),
  acceptanceCriteria: z.string({ required_error: "Acceptance criteria are required."}).min(10, "Acceptance criteria must be at least 10 characters long."),
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
