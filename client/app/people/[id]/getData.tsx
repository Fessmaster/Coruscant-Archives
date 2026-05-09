import { IPeople } from "@/types/people-interfaces";
import { ApiResponse } from "@/types/response-type";

export async function getOnePerson(id: string): Promise<ApiResponse<IPeople>> {
    const res = await fetch(`http://localhost:3030/people/${id}`);
    
    return res.json()
}