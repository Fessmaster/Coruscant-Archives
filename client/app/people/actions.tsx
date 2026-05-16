'use server'
import { apiRequest } from "@/lib/api-request";
import { revalidatePath } from "next/cache";

export async function deletePeople(id: string) {
  // const result = await fetch(`http://localhost:3030/people/${id}`, {
  //   method: "DELETE",
  // });

  const result = await apiRequest(`/people/${id}`, {method: 'DELETE'})

  if (!result.ok) {
    throw new Error("Error while deleting");
  }

  revalidatePath("/people");
}
