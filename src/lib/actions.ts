'use server';

import { z } from 'zod';
import { analyzeCodeStyle } from '@/ai/flows/code-stylistic-analysis';

const FormSchema = z.object({
  codeSnippet: z.string().min(10, { message: 'El fragmento de código debe tener al menos 10 caracteres.' }),
  programmingLanguage: z.string({
    required_error: "Por favor, selecciona un lenguaje de programación.",
  }),
});

export type FormState = {
  message: string;
  suggestions?: string;
  success: boolean;
};

export async function handleCodeAnalysis(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    codeSnippet: formData.get('codeSnippet'),
    programmingLanguage: formData.get('programmingLanguage'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
      success: false,
    };
  }

  try {
    const result = await analyzeCodeStyle(validatedFields.data);
    if (result.suggestions) {
      return {
        message: 'Análisis completado.',
        suggestions: result.suggestions,
        success: true,
      };
    } else {
        return { message: 'La IA no pudo proporcionar sugerencias.', success: false };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Ocurrió un error durante el análisis. Por favor, inténtalo de nuevo.',
      success: false,
    };
  }
}
