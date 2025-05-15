import { Suspense } from "react";
import VerifyMfa from "./_verifymfa";

const Page = () => {
  return (
    <Suspense>
      <VerifyMfa />;
    </Suspense>
  );
};

export default Page;
