import { IPeople } from "@/types/people-interfaces";
import { ApiResponse, IPaginatedData } from "@/types/response-type";

export async function getData(): Promise<ApiResponse<IPaginatedData<IPeople[]>>> {
  const res = await fetch("http://localhost:3030/people");

  if (!res.ok) {
    throw new Error("An error occurred while getting data from server");
  }

  return res.json();
}