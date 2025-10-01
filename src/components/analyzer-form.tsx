'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCodeAnalysis, FormState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Terminal } from 'lucide-react';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
      {pending ? 'Analizando...' : 'Analizar Código'}
    </Button>
  );
}

export function AnalyzerForm() {
  const [state, formAction] = useActionState(handleCodeAnalysis, initialState);

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="language" className="text-base">Lenguaje de Programación</Label>
          <Select name="programmingLanguage" defaultValue="csharp" required>
              <SelectTrigger id="language" className="text-base h-12">
                  <SelectValue placeholder="Selecciona un lenguaje" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
              </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
            <Label htmlFor="code-snippet" className="text-base">Fragmento de Código</Label>
            <Textarea
            id="code-snippet"
            name="codeSnippet"
            placeholder="Pega tu código aquí..."
            className="min-h-[250px] font-code text-sm"
            required
            />
        </div>
      </div>
      

      <SubmitButton />

      {state.message && !state.success && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.success && state.suggestions && (
        <Card className="mt-8 border-accent">
          <CardHeader className="flex flex-row items-center gap-4 bg-accent/10">
            <Lightbulb className="w-6 h-6 text-accent"/>
            <CardTitle className="font-headline text-2xl text-accent">Sugerencias de la IA</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-base whitespace-pre-wrap font-sans leading-relaxed">
              {state.suggestions}
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
