import { IPeople } from "@/types/people-interfaces";
import { ApiResponse } from "@/types/response-type";

export async function getPersonById(id: string): Promise<ApiResponse<IPeople>> {
    const res = await fetch(`http://localhost:3030/people/${id}`, {
        next: {tags: [`people-${id}`]}
    });
    
    return res.json()
}