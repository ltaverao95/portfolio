export function AppFooter() {
  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luis Felipe Tavera Orozco. Diseñado y desarrollado con pasión.
        </p>
      </div>
    </footer>
  );
}
