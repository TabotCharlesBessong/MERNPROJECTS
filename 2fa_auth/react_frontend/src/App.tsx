import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import ConfirmAccount from "./pages/auth/confirm-account";
import ResetPassword from "./pages/auth/reset-password";
import VerifyMfa from "./pages/auth/verify-mfa";
import Home from "./pages/home";
import Session from "./pages/sessions";
import AppLayout from "./layout/AppLayout";
import BaseLayout from "./layout/BaseLayout";
import AuthRoute from "./routes/auth.route";
import PublicRoute from "./routes/public.route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="confirm-account" element={<ConfirmAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-mfa" element={<VerifyMfa />} />
          </Route>
        </Route>

        {/* Protected Route */}
        <Route element={<AuthRoute />}>
          <Route element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="sessions" element={<Session />} />
          </Route>
        </Route>
        {/* Catch-all for undefined routes */}
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
