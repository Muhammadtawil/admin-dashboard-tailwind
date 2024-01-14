
import { revalidatePath } from "next/cache";

import AddClient, {
  DeleteClient,
  UpdateClient,
  getClients,
} from "../../../server/clients/clients";
import { GetServices } from "../../../server/services/services";
import ClientTable from "./client_Table";





async function Delete(taskId: string) {
  "use server";
  try {
    await DeleteClient(taskId);
    revalidatePath("/cases", "page");
  } catch (error) {}
}

async function onCreate(formData: FormData) {
  "use server";
  try {
    await AddClient(formData);
    revalidatePath("/cases", "page");
   
  } catch (error) {}
}

async function onUpdate(formData: FormData, clientId: string) {
  "use server";
  try {
    await UpdateClient(formData, clientId);
    revalidatePath("/[lang]/clients", "page");
  } catch (error) {}
}

const ClientsComponent = async () => {
  const client = await getClients();
  const services = await GetServices();

  return (
      <>
          <ClientTable clientsData={client} serviceList={services}/>
      {/* <AddTaskForm onCreate={onCreate} servicesList={services} />
      <ClientTable
        dataRows={client}
        deleteTask={Delete}
        updateTask={onUpdate}
        servicesList={services}
      /> */}
    </>
  );
};

export default ClientsComponent;
