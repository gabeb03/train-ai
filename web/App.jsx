import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import {
  Provider,
  SignedInOrRedirect,
  SignedOutOrRedirect,
} from "@gadgetinc/react";
import { Suspense, useEffect } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import { api } from "./api";
import { ChatProvider } from "./hooks/useChat";
import ChangePassword from "./routes/change-password";
import Chat from "./routes/chat";
import { Dashboard } from "./routes/dashboard";
import ForgotPassword from "./routes/forgot-password";
import Index from "./routes/index";
import ResetPasswordPage from "./routes/reset-password";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import { SignupForm } from "./routes/sign-up-form";
import VerifyEmailPage from "./routes/verify-email";

const App = () => {
  useEffect(() => {
    document.title = `Train.Ai`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SignedOutOrRedirect path="/dashboard">
              <Index />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="chat"
          element={
            <SignedInOrRedirect>
              <ChatProvider>
                <Chat />
              </ChatProvider>
            </SignedInOrRedirect>
          }
        />
        <Route
          path="change-password"
          element={
            <SignedInOrRedirect>
              <ChangePassword />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="forgot-password"
          element={
            <SignedOutOrRedirect>
              <ForgotPassword />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-in"
          element={
            <SignedOutOrRedirect>
              <SignInPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-up"
          element={
            <SignedOutOrRedirect>
              <SignUpPage />
            </SignedOutOrRedirect>
          }
        />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

const Layout = () => {
  const navigate = useNavigate();
  return (
    <Provider
      api={api}
      navigate={navigate}
      auth={window.gadgetConfig.authentication}
    >
      <ChakraBaseProvider theme={theme}>
        <Box height="100vh" width="100vw">
          <Outlet />
        </Box>
      </ChakraBaseProvider>
    </Provider>
  );
};

export default App;
