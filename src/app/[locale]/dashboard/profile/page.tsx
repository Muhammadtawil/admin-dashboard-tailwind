

import { Metadata } from "next";
import ProfileComponent from "@/components/Dashboard/profile/profile_component";
export const metadata: Metadata = {
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
};

const Profile = () => {
  return (
    <>
    <ProfileComponent/>
    </>
     
  );
};

export default Profile;
