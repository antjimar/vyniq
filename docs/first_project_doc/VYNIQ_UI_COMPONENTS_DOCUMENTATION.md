# Análisis Completo de Componentes React UI Reutilizables - Vyniq Financial App

## 📋 Estructura General del Proyecto

### Stack Tecnológico

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Componentes**: Radix UI + Lucide React Icons
- **Internacionalización**: next-intl (ES/EN)
- **Gestión de Estado**: TanStack Query + React Hook Form
- **Gráficos**: Recharts

---

## 🎨 1. DESIGN TOKENS Y SISTEMA DE DISEÑO

### CSS Variables y Colores

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}

/* Hide spinner arrows from number inputs */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Override default border radius - be more specific and avoid progress bars */
@layer components {
  /* Only basic elements, not progress bars */
  .rounded-md {
    border-radius: 6px !important;
  }

  .rounded-lg {
    border-radius: 8px !important;
  }

  .rounded {
    border-radius: 6px !important;
  }

  /* Solo aplicar circle radius a elementos que claramente no son progress bars */
  .force-circle {
    border-radius: 50% !important;
  }

  /* Progress bars deben mantener su rounded-full natural (9999px) */
  .progress-bar,
  .progress-track,
  [data-radix-progress-root],
  [data-radix-progress-indicator] {
    border-radius: 9999px !important;
  }

  /* Progress bars con fondo gris claro en lugar de negro */
  .progress-track[data-radix-progress-root] {
    background-color: hsl(240 5% 92%) !important;
  }

  /* Tabs con corner radius mejorado para que coincida con el contenedor */
  [data-radix-tabs-list] {
    border-radius: 8px !important;
  }

  [data-radix-tabs-trigger][data-state="active"] {
    border-radius: 3px !important;
  }

  [data-radix-tabs-trigger] {
    border-radius: 3px !important;
  }
}

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(210 25% 7.8431%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(210 25% 7.8431%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(210 25% 7.8431%);
  --primary: hsl(203.8863 88.2845% 53.1373%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(210 25% 7.8431%);
  --secondary-foreground: hsl(0 0% 100%);
  --muted: hsl(240 1.9608% 90%);
  --muted-foreground: hsl(210 25% 7.8431%);
  --accent: hsl(211.5789 51.3514% 92.7451%);
  --accent-foreground: hsl(203.8863 88.2845% 53.1373%);
  --destructive: hsl(356.3033 90.5579% 54.3137%);
  --destructive-foreground: hsl(0 0% 100%);
  --border: hsl(201.4286 30.4348% 90.9804%);
  --input: hsl(200 23.0769% 97.451%);
  --ring: hsl(202.8169 89.1213% 53.1373%);
  --chart-1: hsl(203.8863 88.2845% 53.1373%);
  --chart-2: hsl(159.7826 100% 36.0784%);
  --chart-3: hsl(42.029 92.8251% 56.2745%);
  --chart-4: hsl(147.1429 78.5047% 41.9608%);
  --chart-5: hsl(341.4894 75.2% 50.9804%);
  --sidebar: hsl(180 6.6667% 97.0588%);
  --sidebar-foreground: hsl(210 25% 7.8431%);
  --sidebar-primary: hsl(203.8863 88.2845% 53.1373%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(211.5789 51.3514% 92.7451%);
  --sidebar-accent-foreground: hsl(203.8863 88.2845% 53.1373%);
  --sidebar-border: hsl(205 25% 90.5882%);
  --sidebar-ring: hsl(202.8169 89.1213% 53.1373%);
  --font-sans: Open Sans, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: Menlo, monospace;
  --radius: 1.3rem;
  --shadow-2xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-sm:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-md:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 2px 4px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-lg:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 4px 6px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-xl:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 8px 10px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-2xl: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: hsl(0 0% 0%);
  --foreground: hsl(200 6.6667% 91.1765%);
  --card: hsl(228 9.8039% 10%);
  --card-foreground: hsl(0 0% 85.098%);
  --popover: hsl(0 0% 0%);
  --popover-foreground: hsl(200 6.6667% 91.1765%);
  --primary: hsl(203.7736 87.6033% 52.549%);
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(195 15.3846% 94.902%);
  --secondary-foreground: hsl(210 25% 7.8431%);
  --muted: hsl(0 0% 9.4118%);
  --muted-foreground: hsl(210 3.3898% 46.2745%);
  --accent: hsl(205.7143 70% 7.8431%);
  --accent-foreground: hsl(203.7736 87.6033% 52.549%);
  --destructive: hsl(356.3033 90.5579% 54.3137%);
  --destructive-foreground: hsl(0 0% 100%);
  --border: hsl(210 5.2632% 14.902%);
  --input: hsl(207.6923 27.6596% 18.4314%);
  --ring: hsl(202.8169 89.1213% 53.1373%);
  --chart-1: hsl(203.8863 88.2845% 53.1373%);
  --chart-2: hsl(159.7826 100% 36.0784%);
  --chart-3: hsl(42.029 92.8251% 56.2745%);
  --chart-4: hsl(147.1429 78.5047% 41.9608%);
  --chart-5: hsl(341.4894 75.2% 50.9804%);
  --sidebar: hsl(228 9.8039% 10%);
  --sidebar-foreground: hsl(0 0% 85.098%);
  --sidebar-primary: hsl(202.8169 89.1213% 53.1373%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(205.7143 70% 7.8431%);
  --sidebar-accent-foreground: hsl(203.7736 87.6033% 52.549%);
  --sidebar-border: hsl(205.7143 15.7895% 26.0784%);
  --sidebar-ring: hsl(202.8169 89.1213% 53.1373%);
  --font-sans: Open Sans, sans-serif;
  --font-serif: Georgia, serif;
  --font-mono: Menlo, monospace;
  --radius: 1.3rem;
  --shadow-2xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-sm:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-md:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 2px 4px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-lg:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 4px 6px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-xl:
    0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0),
    0px 8px 10px -1px hsl(202.8169 89.1213% 53.1373% / 0);
  --shadow-2xl: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased bg-background text-foreground;
  }
}

/* Placeholder styles */
::placeholder {
  color: #9ca3af !important; /* text-gray-400 */
  opacity: 0.6;
}

::-webkit-input-placeholder {
  color: #9ca3af !important;
  opacity: 0.6;
}

::-moz-placeholder {
  color: #9ca3af !important;
  opacity: 0.6;
}

:-ms-input-placeholder {
  color: #9ca3af !important;
  opacity: 0.6;
}
```

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

### Utilidad cn() para Merge de Clases

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🧩 2. COMPONENTES UI BASE (shadcn/ui)

### Button Component

```tsx
// src/components/ui/button.tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### Card Component System

```tsx
// src/components/ui/card.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
```

### Input Component

```tsx
// src/components/ui/input.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

### Badge Component con Variantes

```tsx
// src/components/ui/badge.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

### Dialog/Modal Component

```tsx
// src/components/ui/dialog.tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

### Select Component

```tsx
// src/components/ui/select.tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
```

### Table Component System

```tsx
// src/components/ui/table.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
```

### Form Component System

```tsx
// src/components/ui/form.tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
```

### Alert Component

```tsx
// src/components/ui/alert.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
```

---

## 🛠️ 3. COMPONENTES ESPECIALIZADOS REUTILIZABLES

### Loading States System

```tsx
// src/components/ui/loading-states.tsx
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Generic loading spinner
export function LoadingSpinner({
  size = "default",
  className = "",
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
}

// Loading overlay for buttons
export function ButtonLoading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" />
      {children}
    </div>
  );
}

// Full page loading
export function PageLoading({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <LoadingSpinner size="lg" className="text-blue-600" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

// Table loading skeleton
export function TableLoadingSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="flex space-x-4">
              {Array.from({ length: columns }, (_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Card loading skeleton
export function CardLoadingSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Chart loading skeleton
export function ChartLoadingSkeleton({ height = 300 }: { height?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full" style={{ height: `${height}px` }} />
      </CardContent>
    </Card>
  );
}

// Form loading overlay
export function FormLoading({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative ${isLoading ? "pointer-events-none opacity-50" : ""}`}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
```

### Skeleton con Shimmer Effect

```tsx
// src/components/ui/skeleton.tsx
"use client";

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
```

### Empty States System

```tsx
// src/components/empty-states.tsx
"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileX,
  Database,
  Wallet,
  TrendingUp,
  PiggyBank,
  Target,
  Plus,
} from "lucide-react";

interface EmptyStateProps {
  type:
    | "transactions"
    | "categories"
    | "budgets"
    | "investments"
    | "balances"
    | "general";
  onAction?: () => void;
  actionLabel?: string;
}

const iconMap = {
  transactions: Wallet,
  categories: Database,
  budgets: Target,
  investments: TrendingUp,
  balances: PiggyBank,
  general: FileX,
};

export function EmptyState({ type, onAction, actionLabel }: EmptyStateProps) {
  const t = useTranslations("empty");
  const Icon = iconMap[type];

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Icon className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t(`${type}.title`)}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          {t(`${type}.description`)}
        </p>
        {onAction && (
          <Button onClick={onAction}>
            <Plus className="w-4 h-4 mr-2" />
            {actionLabel || t(`${type}.action`)}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Specific empty states for common use cases
export function NoTransactionsState({
  onAddTransaction,
}: {
  onAddTransaction?: () => void;
}) {
  return (
    <EmptyState
      type="transactions"
      {...(onAddTransaction && { onAction: onAddTransaction })}
    />
  );
}

export function NoCategoriesState({
  onAddCategory,
}: {
  onAddCategory?: () => void;
}) {
  return (
    <EmptyState
      type="categories"
      {...(onAddCategory && { onAction: onAddCategory })}
    />
  );
}

export function NoBudgetsState({ onAddBudget }: { onAddBudget?: () => void }) {
  return (
    <EmptyState
      type="budgets"
      {...(onAddBudget && { onAction: onAddBudget })}
    />
  );
}

export function NoInvestmentsState({
  onAddInvestment,
}: {
  onAddInvestment?: () => void;
}) {
  return (
    <EmptyState
      type="investments"
      {...(onAddInvestment && { onAction: onAddInvestment })}
    />
  );
}

export function NoBalancesState() {
  return <EmptyState type="balances" />;
}

// General empty state for search results or filtered data
export function NoResultsState() {
  const t = useTranslations("empty");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileX className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {t("noResults.title")}
      </h3>
      <p className="text-muted-foreground max-w-sm">
        {t("noResults.description")}
      </p>
    </div>
  );
}
```

### Skeleton Loaders Especializados

```tsx
// src/components/loading/skeleton-loaders.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Skeleton for summary cards
export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Skeleton for filters section
export function FiltersSkeleton() {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <Skeleton className="h-5 w-16 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-8 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton for data table
export function DataTableSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Table headers */}
        <div className="grid grid-cols-6 gap-4 pb-4 border-b">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100"
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <Skeleton key={j} className="h-8 w-full" />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Skeleton for charts
export function ChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

// Complete section skeleton
export function SectionSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Summary Cards */}
      <div>
        <Skeleton className="h-6 w-40 mb-4" />
        <SummaryCardsSkeleton />
      </div>

      {/* Filters */}
      <FiltersSkeleton />

      {/* Data Table */}
      <DataTableSkeleton />

      {/* Charts */}
      <ChartsSkeleton />
    </div>
  );
}
```

---

## 💬 4. TOAST NOTIFICATION SYSTEM

### Toast Component Avanzado

```tsx
// src/components/ui/toast.tsx
"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border-2 p-6 pr-8 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 bg-white text-gray-800 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.15)]",
        destructive:
          "border-[#EF4444] bg-red-50 text-red-900 shadow-[0_8px_16px_-4px_rgba(239,68,68,0.3)]",
        success:
          "border-[#10B981] bg-green-50 text-green-900 shadow-[0_8px_16px_-4px_rgba(16,185,129,0.3)]",
        warning:
          "border-yellow-400 bg-yellow-50 text-yellow-900 shadow-[0_8px_16px_-4px_rgba(245,158,11,0.25)]",
        info: "border-blue-400 bg-blue-50 text-blue-900 shadow-[0_8px_16px_-4px_rgba(59,130,246,0.25)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "group-[.destructive]:border-[#EF4444] group-[.destructive]:text-red-800 group-[.destructive]:hover:bg-red-100",
      "group-[.success]:border-[#10B981] group-[.success]:text-green-800 group-[.success]:hover:bg-green-100",
      "group-[.warning]:border-yellow-400 group-[.warning]:text-yellow-800 group-[.warning]:hover:bg-yellow-100",
      "group-[.info]:border-blue-400 group-[.info]:text-blue-800 group-[.info]:hover:bg-blue-100",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-70 transition-opacity hover:text-gray-700 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      "group-[.destructive]:text-[#EF4444] group-[.destructive]:hover:text-red-800",
      "group-[.success]:text-[#10B981] group-[.success]:hover:text-green-800",
      "group-[.warning]:text-yellow-600 group-[.warning]:hover:text-yellow-800",
      "group-[.info]:text-blue-600 group-[.info]:hover:text-blue-800",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
```

### Sistema Unificado de Notificaciones

```tsx
// src/lib/notifications.ts
/**
 * Unified Toast Notification System for Vyniq
 *
 * This module provides a centralized way to display toast notifications
 * across the entire application with consistent styling and behavior.
 *
 * Usage Examples:
 *
 * // Simple notifications
 * showSuccess("Transaction created successfully")
 * showError("Failed to save transaction")
 * showWarning("Budget limit approaching")
 * showInfo("New feature available")
 *
 * // With custom titles
 * showSuccess("Transaction saved", { title: "Success!" })
 * showError("Network error", { title: "Connection Failed" })
 *
 * // Full customization
 * showNotification({
 *   title: "Custom Title",
 *   description: "Custom message",
 *   variant: "success",
 *   duration: 5000
 * })
 */

import { toast, success, error, warning, info } from "@/hooks/use-toast";
import type { ToastProps } from "@/components/ui/toast";
import * as React from "react";

// Type definitions for the notification system
export type NotificationType =
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "default";

export interface NotificationOptions
  extends Omit<ToastProps, "variant" | "description"> {
  id?: string;
}

export interface FullNotificationOptions extends Omit<ToastProps, "variant"> {
  variant?: NotificationType;
}

/**
 * Show a success notification with green styling
 * @param message - The message to display
 * @param options - Additional options like title, duration, etc.
 */
export function showSuccess(
  message: React.ReactNode,
  options?: NotificationOptions
) {
  return success(message, options);
}

/**
 * Show an error notification with red styling
 * @param message - The error message to display
 * @param options - Additional options like title, duration, etc.
 */
export function showError(
  message: React.ReactNode,
  options?: NotificationOptions
) {
  return error(message, options);
}

/**
 * Show a warning notification with yellow styling
 * @param message - The warning message to display
 * @param options - Additional options like title, duration, etc.
 */
export function showWarning(
  message: React.ReactNode,
  options?: NotificationOptions
) {
  return warning(message, options);
}

/**
 * Show an info notification with blue styling
 * @param message - The info message to display
 * @param options - Additional options like title, duration, etc.
 */
export function showInfo(
  message: React.ReactNode,
  options?: NotificationOptions
) {
  return info(message, options);
}

/**
 * Show a notification with full customization
 * @param options - Complete toast configuration
 */
export function showNotification(options: FullNotificationOptions) {
  return toast(options as Parameters<typeof toast>[0]);
}

// Specialized notifications for common use cases

/**
 * Show success notification for save operations
 */
export function showSaveSuccess(entity?: string) {
  const message = entity
    ? `${entity} guardado correctamente`
    : "Guardado correctamente";
  return showSuccess(message);
}

/**
 * Show error notification for save operations
 */
export function showSaveError(entity?: string, error?: string) {
  const message = entity ? `Error al guardar ${entity}` : "Error al guardar";
  return showError(error || message);
}

/**
 * Show success notification for delete operations
 */
export function showDeleteSuccess(entity?: string) {
  const message = entity
    ? `${entity} eliminado correctamente`
    : "Eliminado correctamente";
  return showSuccess(message);
}

/**
 * Show error notification for delete operations
 */
export function showDeleteError(entity?: string, error?: string) {
  const message = entity ? `Error al eliminar ${entity}` : "Error al eliminar";
  return showError(error || message);
}

/**
 * Show success notification for import operations
 */
export function showImportSuccess(count: number, entity?: string) {
  const entityText = entity || "elementos";
  const message = `Se importaron ${count} ${entityText} correctamente`;
  return showSuccess(message, { duration: 4000 }); // 4 seconds for import success
}

/**
 * Show error notification for import operations
 */
export function showImportError(error?: string) {
  return showError(error || "Error durante la importación", { duration: 7000 }); // 7 seconds for import errors
}

/**
 * Show validation error notification
 */
export function showValidationError(message: string) {
  return showError(message, { title: "Datos inválidos", duration: 6000 }); // 6 seconds for validation errors
}

/**
 * Show network error notification
 */
export function showNetworkError() {
  return showError("Error de conexión. Verifique su conexión a internet.", {
    title: "Error de conexión",
    duration: 8000, // 8 seconds for network errors (need more time to retry)
  });
}

// Export the toast hook for advanced usage
export { useToast } from "@/hooks/use-toast";

// Export types for TypeScript support
export type { ToastProps } from "@/components/ui/toast";
```

---

## ✅ 5. MODAL DE CONFIRMACIÓN REUTILIZABLE

### Modal de Confirmación Completo

```tsx
// src/components/ui/confirmation-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConfirmationModalVariant = "destructive" | "warning" | "info";

export interface EntityPreview {
  name: string;
  subtitle?: string;
  icon?: React.ReactNode;
  metadata?: Record<string, string>;
  className?: string;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  variant?: ConfirmationModalVariant;
  title: string;
  message: string;
  warning?: string;
  entityPreview?: EntityPreview;
  actions?: {
    confirmText?: string;
    cancelText?: string;
    loadingText?: string;
    showLoadingSpinner?: boolean;
  };
  isLoading?: boolean;
  translationNamespace?: string;
  className?: string;
  autoCloseOnSuccess?: boolean;
}

/**
 * Variant configuration mapping for different modal types
 * Updated to follow Vyniq's design system colors and standards
 */
const VARIANT_CONFIG = {
  destructive: {
    icon: <AlertTriangle className="h-5 w-5" />,
    titleColor: "text-red-600",
    backgroundColor: "bg-red-50/80",
    borderColor: "border-red-200",
    textColor: "text-red-900",
    buttonVariant: "destructive" as const,
  },
  warning: {
    icon: <AlertCircle className="h-5 w-5" />,
    titleColor: "text-amber-600", // Better contrast than yellow
    backgroundColor: "bg-amber-50/80",
    borderColor: "border-amber-200",
    textColor: "text-amber-900",
    buttonVariant: "default" as const,
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    titleColor: "text-blue-600", // Vyniq's primary blue
    backgroundColor: "bg-blue-50/80",
    borderColor: "border-blue-200",
    textColor: "text-blue-900",
    buttonVariant: "default" as const,
  },
};

/**
 * Entity preview card component for displaying what's being acted upon
 */
function EntityPreviewCard({
  entityPreview,
  variant = "destructive",
}: {
  entityPreview: EntityPreview;
  variant: ConfirmationModalVariant;
}) {
  return (
    <div
      className={cn(
        // Base styling with improved visual hierarchy
        "mt-4 p-4 bg-white rounded-md border-2 transition-all duration-200",
        // Enhanced border styling based on variant
        variant === "destructive" && "border-red-200 bg-red-50/30",
        variant === "warning" && "border-yellow-200 bg-yellow-50/30",
        variant === "info" && "border-blue-200 bg-blue-50/30",
        // Shadow for better depth perception
        "shadow-sm hover:shadow-md",
        entityPreview.className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left section: Icon + Content */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {entityPreview.icon && (
            <div
              className={cn(
                "flex-shrink-0 mt-1 p-2 rounded-full",
                // Icon background based on variant
                variant === "destructive" && "bg-red-100 text-red-600",
                variant === "warning" && "bg-amber-100 text-amber-600",
                variant === "info" && "bg-blue-100 text-blue-600"
              )}
            >
              {entityPreview.icon}
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-semibold text-gray-900 text-sm leading-tight">
              {entityPreview.name}
            </h4>
            {entityPreview.subtitle && (
              <p className="text-xs text-gray-600 leading-relaxed">
                {entityPreview.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right section: Metadata */}
        {entityPreview.metadata &&
          Object.keys(entityPreview.metadata).length > 0 && (
            <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
              {Object.entries(entityPreview.metadata).map(([key, value]) => (
                <span
                  key={key}
                  className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full border",
                    // Metadata styling based on variant
                    variant === "destructive" &&
                      "bg-red-50 text-red-700 border-red-200",
                    variant === "warning" &&
                      "bg-amber-50 text-amber-700 border-amber-200",
                    variant === "info" &&
                      "bg-blue-50 text-blue-700 border-blue-200"
                  )}
                  title={`${key}: ${value}`}
                >
                  {value}
                </span>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

/**
 * Reusable confirmation modal component following Vyniq's design system
 *
 * Features:
 * - Multiple variants (destructive, warning, info)
 * - Entity preview cards for showing what's being acted upon
 * - Loading states with spinners
 * - Responsive design
 * - Full accessibility support
 * - Internationalization support
 * - Smooth animations
 */
export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  variant = "destructive",
  title,
  message,
  warning,
  entityPreview,
  actions = {},
  isLoading: externalIsLoading = false,
  translationNamespace = "forms",
  className,
  autoCloseOnSuccess = true,
}: ConfirmationModalProps) {
  const t = useTranslations(translationNamespace);
  const [internalIsLoading, setInternalIsLoading] = useState(false);

  // Use external loading state if provided, otherwise use internal state
  const isLoading = externalIsLoading || internalIsLoading;

  const config = VARIANT_CONFIG[variant];

  // Reset internal loading state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInternalIsLoading(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (isLoading) return;

    try {
      setInternalIsLoading(true);

      // Add a small delay to show loading state for better UX
      await new Promise((resolve) => setTimeout(resolve, 100));
      await onConfirm();

      if (autoCloseOnSuccess) {
        // Small delay before closing for better perceived performance
        setTimeout(() => onClose(), 150);
      }
    } catch (error) {
      console.error("Error in confirmation action:", error);
      // Keep modal open on error so user can retry or cancel
    } finally {
      setInternalIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return; // Prevent closing during loading
    onClose();
  };

  // Get button texts with fallbacks to translations
  const confirmText = actions.confirmText || t("confirm");
  const cancelText = actions.cancelText || t("cancel");
  const loadingText = actions.loadingText || t("loading");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          // Responsive sizing: mobile-first approach
          "w-full max-w-lg mx-4",
          // Mobile: full width with margin, larger screens: constrained width
          "sm:max-w-md md:max-w-lg",
          // Improved focus management
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Better mobile spacing
          "max-h-[90vh] overflow-y-auto",
          // Smooth entrance animation
          "animate-in slide-in-from-bottom-4 duration-300",
          // Loading state styling
          isLoading && "pointer-events-none",
          className
        )}
        // Prevent closing with escape key during loading
        onEscapeKeyDown={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
        // Prevent closing by clicking overlay during loading
        onPointerDownOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle
            className={cn("flex items-center gap-2", config.titleColor)}
            aria-describedby="confirmation-message"
          >
            <span
              className="flex-shrink-0"
              aria-hidden="true"
              role="img"
              aria-label={`${variant} icon`}
            >
              {config.icon}
            </span>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main content area with variant styling */}
          <div
            className={cn(
              "rounded-lg p-5 transition-all duration-200",
              config.backgroundColor,
              config.borderColor,
              "border shadow-sm"
            )}
            role="region"
            aria-labelledby="confirmation-title"
          >
            <p
              id="confirmation-message"
              className={cn("text-sm leading-6", config.textColor)}
            >
              {message}
            </p>

            {/* Entity preview card */}
            {entityPreview && (
              <div
                role="region"
                aria-label="Item details"
                aria-describedby="entity-preview-description"
              >
                <EntityPreviewCard
                  entityPreview={entityPreview}
                  variant={variant}
                />
                <span id="entity-preview-description" className="sr-only">
                  Details for {entityPreview.name}
                  {entityPreview.subtitle && `: ${entityPreview.subtitle}`}
                  {entityPreview.metadata &&
                    Object.keys(entityPreview.metadata).length > 0 &&
                    ". Additional information: " +
                      Object.values(entityPreview.metadata).join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Warning section */}
          {warning && (
            <div
              className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200 leading-6"
              role="alert"
              aria-live="polite"
            >
              <strong className="font-semibold text-gray-900">
                {t("warning") || "Aviso"}:
              </strong>{" "}
              {warning}
            </div>
          )}
        </div>

        {/* Action buttons - improved responsive design with accessibility */}
        <div
          className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-3 pt-2"
          role="group"
          aria-label="Confirmation actions"
        >
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className={cn(
              "w-full sm:w-auto transition-all duration-200",
              "order-2 sm:order-1" // Cancel button appears first on desktop, second on mobile
            )}
            aria-describedby="cancel-button-description"
          >
            {cancelText}
            <span id="cancel-button-description" className="sr-only">
              Close this confirmation dialog without taking action
            </span>
          </Button>

          <Button
            variant={config.buttonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              "w-full sm:w-auto transition-all duration-200",
              "order-1 sm:order-2", // Confirm button appears first on mobile, second on desktop
              // Custom destructive styling to match Vyniq's design system
              variant === "destructive" &&
                "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500/20 focus:ring-offset-2 disabled:bg-red-400 disabled:hover:bg-red-400",
              // Loading state styling improvements
              isLoading && "cursor-not-allowed"
            )}
            aria-describedby={
              isLoading ? "loading-status" : "confirm-button-description"
            }
            aria-live={isLoading ? "polite" : undefined}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 animate-pulse">
                {actions.showLoadingSpinner !== false && (
                  <Loader2
                    className="h-4 w-4 animate-spin transition-all duration-200"
                    aria-hidden="true"
                  />
                )}
                <span className="truncate transition-all duration-200">
                  {loadingText}
                </span>
                <span id="loading-status" className="sr-only">
                  Action in progress, please wait
                </span>
              </div>
            ) : (
              <span className="transition-all duration-200">{confirmText}</span>
            )}
            <span id="confirm-button-description" className="sr-only">
              {variant === "destructive"
                ? "Permanently delete the selected item"
                : "Confirm and proceed with the action"}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Export additional components for advanced usage
 */
export { EntityPreviewCard, VARIANT_CONFIG };
export type { ConfirmationModalProps, ConfirmationModalVariant };

/**
 * Usage examples:
 *
 * // Basic destructive confirmation (e.g., delete category)
 * <ConfirmationModal
 *   isOpen={isDeleteModalOpen}
 *   onClose={() => setIsDeleteModalOpen(false)}
 *   onConfirm={handleDeleteCategory}
 *   variant="destructive"
 *   title={t('deleteCategory')}
 *   message={t('deleteConfirm')}
 *   warning={t('deleteWarning')}
 *   entityPreview={{
 *     name: categoryName,
 *     subtitle: categoryType === 'income' ? t('income') : t('expense'),
 *     metadata: { type: typeLabel }
 *   }}
 * />
 *
 * // Warning confirmation (e.g., budget changes)
 * <ConfirmationModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   onConfirm={onConfirm}
 *   variant="warning"
 *   title="Update Budget Settings"
 *   message="This will affect all existing budget calculations."
 *   actions={{
 *     confirmText: "Update Budget",
 *     cancelText: "Keep Current",
 *     loadingText: "Updating..."
 *   }}
 * />
 *
 * // Info confirmation (e.g., data export)
 * <ConfirmationModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   onConfirm={onConfirm}
 *   variant="info"
 *   title="Export Financial Data"
 *   message="Your data will be exported in CSV format and downloaded."
 *   entityPreview={{
 *     name: "Financial Report 2024",
 *     subtitle: "Includes all transactions and balances",
 *     icon: <FileText className="h-4 w-4" />,
 *     metadata: {
 *       records: "1,234 transactions",
 *       period: "Jan - Dec 2024"
 *     }
 *   }}
 *   actions={{
 *     confirmText: "Export Data",
 *     showLoadingSpinner: true
 *   }}
 * />
 */
```

---

## 📊 6. DATE PICKER OPTIMIZADO

### Date Picker con Variantes

```tsx
// src/components/ui/date-picker.tsx
"use client";

import { useState, useCallback, useMemo, forwardRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { formatDisplayDate, safeParseDate } from "@/lib/date-utils";

type DatePickerVariant = "cell" | "button";

interface DatePickerProps {
  value: string | Date;
  onUpdate: (value: string) => void;
  disabled?: boolean;
  className?: string;
  variant?: DatePickerVariant;
  placeholder?: string;
  buttonClassName?: string;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onUpdate,
      disabled = false,
      className = "",
      variant = "button",
      placeholder = "Seleccionar fecha",
      buttonClassName = "",
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    // Convert value to string format for consistency
    const stringValue = useMemo(() => {
      if (value instanceof Date) {
        return format(value, "yyyy-MM-dd");
      }
      return value;
    }, [value]);

    // Memoize the parsed date to prevent unnecessary re-computations
    const selectedDate = useMemo(() => {
      if (value instanceof Date) return value;
      return safeParseDate(stringValue);
    }, [value, stringValue]);

    // Memoize the formatted display value
    const displayValue = useMemo(() => {
      if (value instanceof Date) {
        return format(value, "dd/MM/yyyy", { locale: es });
      }
      return formatDisplayDate(stringValue);
    }, [value, stringValue]);

    // Memoize the default month to initialize calendar correctly
    const defaultMonth = useMemo(() => {
      // Always use the transaction date as the default month if available
      // This prevents the calendar from jumping to current date
      return selectedDate || new Date();
    }, [selectedDate]);

    // Optimize date selection with useCallback to prevent unnecessary re-renders
    const handleDateSelect = useCallback(
      (date: Date | undefined) => {
        if (date) {
          const formattedDate = format(date, "yyyy-MM-dd");
          onUpdate(formattedDate);
        }
        setOpen(false);
      },
      [onUpdate]
    );

    // Optimize click handler with useCallback
    const handleClick = useCallback(
      (e?: React.MouseEvent) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (!disabled) {
          setOpen(true);
        }
      },
      [disabled]
    );

    // Optimize open state change handler
    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!disabled) {
          setOpen(newOpen);
        }
      },
      [disabled]
    );

    // Render cell variant (for tables)
    if (variant === "cell") {
      return (
        <div ref={ref}>
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <div
                onClick={handleClick}
                className={cn(
                  "cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors h-8 flex items-center w-full text-sm truncate min-w-0",
                  disabled && "cursor-not-allowed opacity-50",
                  className
                )}
              >
                <span className="truncate min-w-0">{displayValue}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              side="bottom"
              sideOffset={5}
              alignOffset={0}
              avoidCollisions={true}
              collisionPadding={10}
            >
              <Calendar
                mode="single"
                selected={selectedDate || undefined}
                onSelect={handleDateSelect}
                locale={es}
                defaultMonth={defaultMonth}
                enableQuickNavigation={true}
                initialFocus
                // Allow dynamic height based on month content
                fixedWeeks={false}
                // Improve performance by disabling outside days rendering
                showOutsideDays={false}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    // Render button variant (for forms)
    return (
      <div ref={ref}>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
                disabled && "cursor-not-allowed opacity-50",
                buttonClassName
              )}
              disabled={disabled}
              onClick={handleClick}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? displayValue : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
            side="bottom"
            sideOffset={5}
            alignOffset={0}
            avoidCollisions={true}
            collisionPadding={10}
          >
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={handleDateSelect}
              locale={es}
              defaultMonth={defaultMonth}
              enableQuickNavigation={true}
              initialFocus
              // Allow dynamic height based on month content
              fixedWeeks={false}
              // Improve performance by disabling outside days rendering
              showOutsideDays={false}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
export type { DatePickerProps, DatePickerVariant };
```

---

## 📊 7. CHART SYSTEM COMPONENTS

### Chart Container System

```tsx
// src/components/ui/chart.tsx
"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
```

---

## 🔧 8. UTILIDADES Y HELPERS

### Formateo de Moneda (EUR)

```typescript
// src/lib/format-utils.ts
export function formatCurrency(amount: number | string): string {
  // Manual Spanish format: dot as thousands separator, comma as decimal separator
  const numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount?.toString() || "0");
  const formattedNumber = formatNumber(numericAmount);
  return `${formattedNumber} €`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(amount: number | string): string {
  // Manual Spanish format for numbers without currency symbol
  // Punto como separador de miles, coma como separador decimal
  let numericAmount =
    typeof amount === "number" ? amount : parseFloat(amount?.toString() || "0");

  // Handle edge cases: NaN, Infinity, very large numbers
  if (!isFinite(numericAmount) || isNaN(numericAmount)) {
    numericAmount = 0;
  }

  // Prevent scientific notation by limiting to reasonable range
  if (Math.abs(numericAmount) > 999999999999) {
    // 999 billion limit
    numericAmount = Math.sign(numericAmount) * 999999999999;
  }

  const parts = numericAmount.toFixed(2).split(".");
  const integerPart = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") ?? "0";
  const decimalPart = parts[1] ?? "00";
  return `${integerPart},${decimalPart}`;
}

export function parseAmount(value: string): number {
  // Parse numbers in Spanish format (1.234,56) or international format (1234.56)
  if (typeof value !== "string") {
    return parseFloat(value as string) || 0;
  }

  // If it contains comma as decimal (Spanish format)
  if (value.includes(",") && value.lastIndexOf(",") > value.lastIndexOf(".")) {
    // Spanish format: 1.234,56
    const cleanValue = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleanValue) || 0;
  } else {
    // Formato internacional: 1234.56 o 1,234.56
    const cleanValue = value.replace(/,/g, "");
    return parseFloat(cleanValue) || 0;
  }
}
```

### Table Footer con Calculadoras

```tsx
// src/components/table-footer.tsx
"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/format-utils";

export type FooterOperation = "none" | "sum" | "average";

interface TableData {
  [key: string]: string | number;
}

interface TableFooterRowProps {
  data: TableData[];
  columns: {
    key: string;
    label: string;
    type: "currency" | "text" | "date";
  }[];
}

export default function TableFooterRow({ data, columns }: TableFooterRowProps) {
  const [operations, setOperations] = useState<Record<string, FooterOperation>>(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "none" }), {})
  );

  const calculateValue = (columnKey: string, operation: FooterOperation) => {
    if (operation === "none" || data.length === 0) return "";

    const column = columns.find((col) => col.key === columnKey);
    if (!column || column.type !== "currency") return "";

    const values = data
      .map((row) => parseFloat(String(row[columnKey])) || 0)
      .filter((val) => !isNaN(val));

    if (values.length === 0) return "";

    switch (operation) {
      case "sum":
        const sum = values.reduce((acc, val) => acc + val, 0);
        return formatCurrency(sum);

      case "average":
        const avg = values.reduce((acc, val) => acc + val, 0) / values.length;
        return formatCurrency(avg);

      default:
        return "";
    }
  };

  const updateOperation = (columnKey: string, operation: FooterOperation) => {
    setOperations((prev) => ({
      ...prev,
      [columnKey]: operation,
    }));
  };

  return (
    <tr className="bg-gray-50 border-t-2 border-gray-200">
      {columns.map((column) => {
        const operation = operations[column.key];
        if (!operation) return null;

        const value = calculateValue(column.key, operation);

        return (
          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
            {column.type === "currency" ? (
              <div className="flex flex-col space-y-2">
                <Select
                  value={operation}
                  onValueChange={(value: FooterOperation) =>
                    updateOperation(column.key, value)
                  }
                >
                  <SelectTrigger className="h-7 text-xs border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-</SelectItem>
                    <SelectItem value="sum">Σ Suma</SelectItem>
                    <SelectItem value="average">⌀ Media</SelectItem>
                  </SelectContent>
                </Select>
                {value && (
                  <div
                    className={`text-sm font-semibold text-center ${
                      operation === "sum" ? "text-green-700" : "text-blue-700"
                    }`}
                  >
                    {value}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-400 text-center">-</div>
            )}
          </td>
        );
      })}
    </tr>
  );
}
```

---

## 📝 9. LÓGICA DE NEGOCIO IDENTIFICADA

### Componentes que Mezclan UI + Lógica de Negocio

1. **Balance Section**: Contiene lógica de filtros persistentes, ordenación y cálculos financieros
2. **Transaction Tables**: Mezclan edición inline, validación y llamadas API
3. **Category Management**: Contiene lógica de validación de categorías y gestión de duplicados
4. **Expense/Income Sections**: Integran filtros, gráficos y gestión de estado

### Patrones de Separación Recomendados

**❌ Antes (mezclado):**

```tsx
// Componente que mezcla UI + lógica de negocio
function TransactionTable() {
  const { data, isLoading } = useTransactions();
  const { workspace } = useWorkspace();
  // ... 50 líneas de lógica de negocio

  return <div>{/* ... JSX complejo mezclado con lógica */}</div>;
}
```

**✅ Después (separado):**

```tsx
// Hook personalizado para lógica
function useTransactionLogic() {
  const { data, isLoading } = useTransactions();
  const { workspace } = useWorkspace();
  // ... toda la lógica aquí

  return { transactions, loading, handleEdit, handleDelete };
}

// Componente UI puro
function TransactionTable({ transactions, loading, onEdit, onDelete }) {
  return <div>{/* ... Solo JSX y presentación */}</div>;
}

// Componente contenedor
function TransactionSection() {
  const logic = useTransactionLogic();

  return (
    <TransactionTable
      transactions={logic.transactions}
      loading={logic.loading}
      onEdit={logic.handleEdit}
      onDelete={logic.handleDelete}
    />
  );
}
```

---

## 🎯 10. RESUMEN DE COMPONENTES EXTRAÍBLES

### Componentes UI Base (46 archivos)

- **Button** con 6 variantes y 4 tamaños
- **Card** system (Header, Content, Footer, Title, Description)
- **Input** con validación y estados
- **Select** completo con scroll y búsqueda
- **Dialog/Modal** system con overlay y animaciones
- **Table** completo con headers, rows, cells
- **Form** system con validación React Hook Form
- **Badge** con 4 variantes
- **Alert** con variantes default/destructive
- **Toast** con 5 variantes y sistema completo
- **Skeleton** con efecto shimmer
- **Loading States** especializados
- **Date Picker** con 2 variantes
- **Chart** system para Recharts
- **Accordion, Tabs, Popover, Tooltip** etc.

### Componentes Especializados Reutilizables

- **ConfirmationModal**: Modal avanzado con previews de entidades
- **EmptyState**: Estados vacíos temáticos
- **LoadingSpinner**: Diferentes tamaños y contextos
- **TableFooter**: Calculadora de totales/promedios
- **NotificationSystem**: Toast unificado
- **DatePicker**: Optimizado con variantes cell/button

### Design Tokens Clave

- **Colores**: Sistema HSL completo con temas claro/oscuro
- **Typography**: Open Sans como fuente principal
- **Spacing**: Sistema basado en 0.25rem
- **Border Radius**: Personalizado a 6px/8px
- **Shadows**: Sistema completo de elevaciones
- **Animations**: Shimmer, fade-in, slide-in

---

## 🚀 11. INSTRUCCIONES DE IMPLEMENTACIÓN

### Dependencias Necesarias

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-label": "^2.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.294.0",
    "react-hook-form": "^7.48.2",
    "date-fns": "^2.30.0",
    "recharts": "^2.8.0"
  }
}
```

### Configuración Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Copiar colores del globals.css
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### Estructura de Archivos Recomendada

```
src/
├── components/
│   ├── ui/                     # Componentes base shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── loading-states.tsx
│   │   ├── confirmation-modal.tsx
│   │   ├── date-picker.tsx
│   │   └── ...
│   ├── empty-states.tsx        # Estados vacíos
│   ├── table-footer.tsx        # Footer de tablas con calculadoras
│   └── loading/
│       └── skeleton-loaders.tsx
├── lib/
│   ├── utils.ts               # Función cn()
│   ├── format-utils.ts        # Formateo de moneda
│   └── notifications.ts       # Sistema de notificaciones
└── app/
    └── globals.css            # CSS completo con variables
```

### Pasos de Migración

1. **Instalar dependencias** listadas arriba
2. **Copiar globals.css** completo con variables CSS
3. **Configurar Tailwind** con los colores y plugins
4. **Copiar componentes UI** uno por uno desde `/components/ui/`
5. **Configurar sistema de notificaciones** con el hook use-toast
6. **Implementar loading states** y estados vacíos
7. **Configurar internacionalización** si es necesario

Esta documentación completa proporciona todo lo necesario para extraer y reutilizar los componentes UI de Vyniq en un nuevo proyecto con arquitectura limpia. Los componentes están diseñados con:

- **Separation of Concerns**: UI vs lógica de negocio claramente separados
- **Reusabilidad**: Componentes configurables mediante props
- **Accessibilidad**: ARIA labels y navegación por teclado
- **Internacionalización**: Soporte para múltiples idiomas
- **Consistencia**: Design system unificado con Tailwind + shadcn/ui
- **Performance**: Memoization y optimizaciones incluidas

Todos los componentes siguen las mejores prácticas de React y pueden ser copiados directamente para usar solo la parte visual sin lógica de negocio.
