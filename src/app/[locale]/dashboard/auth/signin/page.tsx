import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LoginFormTest from "@/components/Dashboard/logins/login_Form";
export const metadata: Metadata = {
  title: "Signin Page | Next.js E-commerce Dashboard Template",
  description: "This is Signin page for TailAdmin Next.js",
  // other metadata
};

const SignIn: React.FC = () => {
  return (
    <>
<LoginFormTest/>
    </>
  );
};

export default SignIn;
