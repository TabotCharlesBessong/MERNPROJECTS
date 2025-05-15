import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[450px] mx-auto h-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
