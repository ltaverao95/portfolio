'use client';
import { AnalyzerForm } from "@/components/analyzer-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";


export default function AnalyzerPage() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">{t('analyzer.title')}</CardTitle>
            <CardDescription className="text-muted-foreground pt-2 text-base">
              {t('analyzer.description')}
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