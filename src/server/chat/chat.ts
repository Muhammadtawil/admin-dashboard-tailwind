import { authOptions } from "@/app/utils/authoptions";
import { getServerSession } from "next-auth/next";


const chatUrl = process.env.CHAT_MESSAGES_URL;


export async function GetChatMessages() {
  const session = await getServerSession(authOptions);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",

    },
    next: {
      // revalidate: 10,
      tags: ["chat"],
    },
  };

  try {
    const response = await fetch(`${chatUrl}`, requestOptions);

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const clients = await response.json();


    return clients;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


