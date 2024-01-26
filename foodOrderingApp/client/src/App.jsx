import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { Header, Loading } from "./components";
import { useLoading } from "./hooks/useLoading";
import setLoadingInterceptor from "./interceptors/loadingInterceptors";

const App = () => {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <>
      <Loading />
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
