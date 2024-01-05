// import LoadingSpinner from "@/components/dashboard/loading spinner/loadinSpinner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Use dynamic import to load BlogsComponent lazily
const AuthorsComponent = dynamic(() => import("../../../.././../components/Dashboard/blogs/authors/authors"), {
  // loading: () => <LoadingSpinner />, 
  ssr: false, // Disable server-side rendering for this component
});

export default function BlogPage() {
  return (
    <>
     <Breadcrumb pageName="Authors" />
      <AuthorsComponent />
    </>
  );
}
