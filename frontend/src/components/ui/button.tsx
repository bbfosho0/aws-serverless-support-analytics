import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/utils/cn";

type ButtonVariant = "primary" | "surface" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-accent/40 hover:bg-accent-strong focus-visible:outline-accent",
  surface:
    "bg-surface text-foreground shadow-inner hover:bg-surface-strong focus-visible:outline-accent",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-muted/20 focus-visible:outline-accent",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses[variant],
        className,
      )}
    />
  );
}
