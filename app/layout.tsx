import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import { createUserIfNeeded } from "@/lib/createUser";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  await createUserIfNeeded();
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorForeground: "#fffff",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="h-screen overflow-hidden">{children}</body>
      </html>
    </ClerkProvider>
  );
}
