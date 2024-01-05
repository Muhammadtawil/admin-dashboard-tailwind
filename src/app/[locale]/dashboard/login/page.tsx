


// import LoadingSpinner from "@/components/dashboard/loading spinner/loadinSpinner";



import { CssBaseline } from "@mui/material";
import dynamic from "next/dynamic";
import LoginForm from "../../../../components/Dashboard/login/loginForm";
import LoginFormTest from "@/components/Dashboard/logins/login_Form";
const LoginComponent = dynamic(() => import("../../../../components/Dashboard/login/loginForm"), {
  // loading: () => <LoadingSpinner />, 
  ssr: false, // Disable server-side rendering for this component
});
const LoginPage = async () => {
  return (
    <>
      {/* <CssBaseline /> */}
      <LoginFormTest />
    </>
  );
};

export default LoginPage;
