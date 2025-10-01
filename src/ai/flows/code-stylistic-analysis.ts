'use server';
/**
 * @fileOverview A code stylistic analysis AI agent.
 *
 * - analyzeCodeStyle - A function that handles the code stylistic analysis process.
 * - CodeStylisticAnalysisInput - The input type for the analyzeCodeStyle function.
 * - CodeStylisticAnalysisOutput - The return type for the analyzeCodeStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeStylisticAnalysisInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to analyze.'),
  programmingLanguage: z.string().describe('The programming language of the code snippet.'),
});
export type CodeStylisticAnalysisInput = z.infer<typeof CodeStylisticAnalysisInputSchema>;

const CodeStylisticAnalysisOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions for improving the code quality and formatting.'),
});
export type CodeStylisticAnalysisOutput = z.infer<typeof CodeStylisticAnalysisOutputSchema>;

export async function analyzeCodeStyle(input: CodeStylisticAnalysisInput): Promise<CodeStylisticAnalysisOutput> {
  return analyzeCodeStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeStylisticAnalysisPrompt',
  input: {schema: CodeStylisticAnalysisInputSchema},
  output: {schema: CodeStylisticAnalysisOutputSchema},
  prompt: `You are a senior software engineer specializing in code quality and style.

You will analyze the provided code snippet and provide suggestions for improving its quality, formatting, and adherence to best practices.
Consider aspects such as readability, maintainability, efficiency, and potential bugs.

Programming Language: {{{programmingLanguage}}}
Code Snippet:
\`\`\`{{{programmingLanguage}}}
{{{codeSnippet}}}
\`\`\`

Suggestions:`, 
});

const analyzeCodeStyleFlow = ai.defineFlow(
  {
    name: 'analyzeCodeStyleFlow',
    inputSchema: CodeStylisticAnalysisInputSchema,
    outputSchema: CodeStylisticAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
