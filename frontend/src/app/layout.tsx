import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TicketingProvider } from "@/components/ticketing-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Queue | Tickets without the guesswork", template: "%s | Queue" },
  description: "Browse live events, choose seats, and complete a clear, secure ticket reservation.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TicketingProvider>
          <SiteHeader />
          <div className="page-content">{children}</div>
          <SiteFooter />
        </TicketingProvider>
      </body>
    </html>
  );
}
