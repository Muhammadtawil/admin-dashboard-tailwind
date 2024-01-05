
import { revalidatePath } from "next/cache";


import AddService, {
  DeleteService,
  GetServices,
  UpdateService,
} from "../../../server/services/services";
import ServicesComponent from "./services_Table";

async function Delete(serviceId: string) {
  "use server";
  try {
    await DeleteService(serviceId);
    revalidatePath("/services", "page");
  } catch (error) {}
}

async function onCreate(formData: FormData) {
  "use server";
  try {
    await AddService(formData);
    revalidatePath("/services", "page");
  } catch (error) {}
}

async function onUpdate(formData: FormData, clientId: string) {
  "use server";
  try {
    await UpdateService(formData, clientId);
    revalidatePath("/services", "page");
  } catch (error) {}
}

const ServicesMain = async () => {
  const services = await GetServices();
  return (
    <>
      {/* <AddTaskForm onCreate={onCreate} /> */}
      <ServicesComponent
        servicesData={services}
        onCreate={onCreate}
        onDelete={Delete}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ServicesMain;
