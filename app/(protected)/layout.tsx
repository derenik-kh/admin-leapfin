import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import MainLayout from "@/components/main-layout";
import { currentUser } from "@/data/auth";
import { getOrganizationById } from "@/data/organizations";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const user = await currentUser();

  const currentOrg = params.slug
    ? await getOrganizationById(Number(params.slug))
    : null;

  return (
    <MainLayout currentOrg={currentOrg} user={user}>
      {children}
    </MainLayout>
  );
}
