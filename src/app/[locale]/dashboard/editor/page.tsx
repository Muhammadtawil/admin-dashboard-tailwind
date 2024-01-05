

// import "draft-js/dist/Draft.css";


// import "react-tabs/style/react-tabs.css";


import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("../../../../components/Dashboard/editor/editorHtml"), {
  // loading: () => <LoadingSpinner />,  // Optional loading component
  ssr: false, // Disable server-side rendering for this component
});

export default function DocEditor() {
  return (
    <>
     
     <Breadcrumb pageName="Editor" />
      <EditorComponent />
    </>
  );
}
