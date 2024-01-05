import React from "react";
import { revalidatePath } from "next/cache";

import AddSubscribers, { DeleteSubscriber, GetSubscribers } from "@/server/subscribers/subscribers";
import SubscribersTable from "./subscribers_table";

async function onCreate(formData: FormData) {
  "use server";
  try {
    await AddSubscribers(formData);
    revalidatePath("/subscribers", "page");
  } catch (error) {}
}

async function Delete(subscriberId: string) {
  "use server";
  try {
    await DeleteSubscriber(subscriberId);
    revalidatePath("/subscribers", "page");
  } catch (error) {}
}

export default async function SubscribersComponent() {
  const subscribers = await GetSubscribers();

  return (
    <>
   
      <SubscribersTable
        SubscribersData={subscribers}
        onDelete={Delete}
   onCreate={onCreate}
      />
    </>
  );
}
