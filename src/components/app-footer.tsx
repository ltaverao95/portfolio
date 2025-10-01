import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AppFooter() {
  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex items-center justify-between">
        <div className="w-4/5">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luis Felipe Tavera Orozco. Diseñado y
            desarrollado con pasión.
          </p>
        </div>
        <div className="w-1/5">
          <Select defaultValue="es">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">Inglés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
}
