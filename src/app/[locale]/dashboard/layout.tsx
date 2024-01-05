/* eslint-disable react/no-children-prop */

import { ReactNode } from "react";
import { Metadata } from "next";
import DashboardLayout from "./dashboard-layout";
import Providers from "../../providers";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: 'LawFirm مكتب المحاماة',
  description: 'LawFirm مكتب المحاماة',
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../dictionaries/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
  }
}

export async function generateStaticParams() {
  return ['en', 'ar'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <Providers>
      <NextIntlClientProvider locale={locale ? locale : "en"} messages={messages}>
        <DashboardLayout>{children}</DashboardLayout>
      </NextIntlClientProvider>
    </Providers>
  );
}
