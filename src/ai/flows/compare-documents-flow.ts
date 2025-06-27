'use server';
/**
 * @fileOverview An AI agent that compares client requirements with provider procedures.
 *
 * - compareDocuments - A function that handles the document comparison process.
 * - CompareDocumentsInput - The input type for the compareDocuments function.
 * - CompareDocumentsOutput - The return type for the compareDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { CompareDocumentsInput as PublicInputType, CompareDocumentsOutput as PublicOutputType } from '@/lib/types';

const CompareDocumentsInputSchema = z.object({
  clientRequirementDataUri: z
    .string()
    .describe(
      "The client's requirement document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  providerProcedureDataUri: z
    .string()
    .describe(
      "The provider's procedure document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CompareDocumentsInput = PublicInputType;

const DiscrepancySchema = z.object({
    clientRequirement: z.string().describe("A concise quote or summary of the specific requirement from the client's document."),
    providerClause: z.string().describe("The corresponding clause from the provider's procedure that is non-compliant or different."),
    suggestedRevision: z.string().describe("A specific, ready-to-use text revision that would make the provider's clause compliant with the client's requirement."),
});

const CompareDocumentsOutputSchema = z.object({
  isCompliant: z.boolean().describe('Whether or not the provider procedure is compliant with the client requirements.'),
  summary: z.string().describe("A text summary of the findings."),
  discrepancies: z.array(DiscrepancySchema).describe("An array of discrepancies found between the two documents. This will be empty if isCompliant is true."),
});
export type CompareDocumentsOutput = PublicOutputType;

export async function compareDocuments(input: CompareDocumentsInput): Promise<CompareDocumentsOutput> {
  return compareDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareDocumentsPrompt',
  input: {schema: CompareDocumentsInputSchema},
  output: {schema: CompareDocumentsOutputSchema},
  prompt: `You are an AI assistant specializing in Non-Destructive Testing (NDT) compliance and documentation review. Your task is to compare a client's requirement document against a service provider's procedure document.

You will perform a detailed analysis of both documents provided.

Your analysis must focus on key compliance points, including but not limited to:
- NDT Method (e.g., UT, RT, MT)
- Applicable Standards (e.g., API 1104, ASME Sec V, ISO 9712)
- Acceptance Criteria
- Personnel qualifications mentioned
- Equipment specifications

Based on your analysis, you will determine if the provider's procedure fully meets the client's requirements.

You must provide your output in a structured JSON format according to the output schema.

If the provider's procedure is compliant, set \`isCompliant\` to \`true\` and provide a brief confirmation in the \`summary\`. The \`discrepancies\` array should be empty.

If there are discrepancies, set \`isCompliant\` to \`false\`. The \`summary\` should explain the main issues found. For each discrepancy, you must populate the \`discrepancies\` array with an object containing:
- \`clientRequirement\`: A concise quote or summary of the specific requirement from the client's document.
- \`providerClause\`: The corresponding clause from the provider's procedure that is non-compliant or different.
- \`suggestedRevision\`: A specific, ready-to-use text revision that would make the provider's clause compliant with the client's requirement.

Client's Requirement Document: {{media url=clientRequirementDataUri}}
Provider's Procedure Document: {{media url=providerProcedureDataUri}}`,
});

const compareDocumentsFlow = ai.defineFlow(
  {
    name: 'compareDocumentsFlow',
    inputSchema: CompareDocumentsInputSchema,
    outputSchema: CompareDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate a document comparison.");
    }
    return output;
  }
);
