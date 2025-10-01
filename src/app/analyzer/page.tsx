import { AnalyzerForm } from "@/components/analyzer-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = {
  title: "Code Stylistic Analysis Tool",
  description: "AI-powered tool to analyze code style and provide suggestions.",
};

export default function AnalyzerPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Análisis Estilístico de Código</CardTitle>
            <CardDescription className="text-muted-foreground pt-2 text-base">
              Pega tu código, selecciona el lenguaje y deja que la IA te dé sugerencias para mejorar su calidad y formato.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyzerForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
