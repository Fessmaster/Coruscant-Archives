import { auth, signOut } from "@/app/auth";

export async function apiRequest(endpoint: string, option: RequestInit = {}) {
  const session = await auth();
  const token = session?.user.accessToken;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...option.headers,
  };

  const response = await fetch(`http://localhost:3030${endpoint}`, {
    ...option,
    headers,
  });

  if (response.status === 401) {
    await signOut({ redirectTo: "/profile" });
  }

  return response
}
