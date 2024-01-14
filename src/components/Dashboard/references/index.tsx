import { GetLibrary } from "@/server/library/library";
import ReferencesComponent from "./references_component";

export default async function LibrayMainComponent() {
    const media = await GetLibrary();
  
    return (

        <>
      <ReferencesComponent files={media} /> 
        
      </>
    
    )
  }
  