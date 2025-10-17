"use client";
import { ReactElement, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store";
import ThemeRegistry from "./ThemeRegistry";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/language';

export default function AppProviders({ children }: { children: React.ReactElement }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </Provider>
    </I18nextProvider>
  );
}
