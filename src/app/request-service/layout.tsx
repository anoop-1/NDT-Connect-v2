// src/app/request-service/layout.tsx
import type { Metadata } from "next";

const SITE = "https://ndt-connect.com";

export const metadata: Metadata = {
  title: "Request an NDT Inspection Quote — UT, RT, MT, PT, ET, VT",
  description:
    "Submit a request for NDT inspection services and get matched with verified providers. Specify method, location, dates, and scope. Free to use.",
  alternates: { canonical: `${SITE}/request-service` },
  openGraph: {
    title: "Request an NDT Inspection Quote",
    description:
      "Get matched with verified NDT inspection providers. Specify method, location, scope.",
    url: `${SITE}/request-service`,
    type: "website",
  },
};

export default function RequestServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
