"use server";

import { UpdatePersonSchema } from "@/schema/update.Person.Scheme";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { apiRequest } from "./api-request";
import { signOut } from "@/app/auth";

export async function updatePeople(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries()); 

  const validateData = UpdatePersonSchema.safeParse(rawData);
  
  if (!validateData.success) {
    return { error: validateData.error.flatten().fieldErrors };
  }

  console.log('------FormData-------');
  console.log(validateData);

  const response = await apiRequest(`/people/${String(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(validateData.data),
    next: {tags: ['people-list', `people-${id}`]}
  })

  if(response.status === 401){
    signOut({redirectTo: '/profile'})
  }


  if (response.ok) {
    revalidateTag('people-list', 'max')
    revalidateTag(`people-${id}`, 'max')

    redirect("/people");
  }
}
