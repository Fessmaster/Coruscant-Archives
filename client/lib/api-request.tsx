import { auth, signOut } from "@/app/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export async function apiRequest<T>(endpoint: string, option: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  const session = await auth();
  const token = session?.user.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...option.headers,
  };

  const response = await fetch(url, {
    ...option,
    headers,
  });

  if (response.status === 401) {
    await signOut({ redirectTo: "/profile" });
  }

  return response.json() as Promise<T>
}
