import React, { Suspense } from "react";
import ConfirmAccount from "./_confirmaccount";
const Page = () => {
  return (
    <Suspense>
      <ConfirmAccount />
    </Suspense>
  );
};

export default Page;
