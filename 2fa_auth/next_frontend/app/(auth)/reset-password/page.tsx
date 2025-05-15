import React, { Suspense } from "react";
import ResetPassword from "./_resetpassword";

const Page = () => {
  return (
    <Suspense>
      <ResetPassword />;
    </Suspense>
  );
};

export default Page;
