// import LoadingSpinner from "@/components/dashboard/loading spinner/loadinSpinner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Use dynamic import to load BlogsComponent lazily
const BlogsComponent = dynamic(() => import("../../../../components/Dashboard/clients/client_Table"), {
  // loading: () => <LoadingSpinner />, 
  ssr: false, // Disable server-side rendering for this component
});

export default function BlogPage() {
  return (
    <>
     <Breadcrumb pageName="Blogs" />
      <BlogsComponent />
    </>
  );
}
