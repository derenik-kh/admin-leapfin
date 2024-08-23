"use client";

import type * as React from "react";
import type { ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

import { useRouter } from "@/hooks/useRouter";
const NextTopLoader = dynamic(() => import("@/components/TopLoader"), {
  ssr: false,
});

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextTopLoader />
      <Toaster richColors />
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
