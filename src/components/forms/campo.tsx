import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Envoltorio de label + control + error, consistente en todos los formularios. */
export function Campo({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p role="alert" aria-live="polite" className="text-sm text-parh-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
