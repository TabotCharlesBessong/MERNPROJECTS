"use client";
import React from "react";
import { GlobalContextProvider } from "@/context/globalContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <GlobalContextProvider>
      {/* <JobsContextProvider>{children}</JobsContextProvider> */}
      {children}
    </GlobalContextProvider>
  );
}

export default ContextProvider;
