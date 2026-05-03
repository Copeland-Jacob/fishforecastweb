import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
