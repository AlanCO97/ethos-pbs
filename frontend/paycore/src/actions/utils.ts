"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = cookies();
  return (await cookieStore).get('auth-token')?.value;
}

export async function getUserFullName(): Promise<string> {
  const cookieStore = cookies();
  return (await cookieStore).get('fullname')?.value ?? "User";
}

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function logoutAction() {
  const cookieStore = cookies();

  (await cookieStore).delete("auth-token");
  (await cookieStore).delete("fullname");

  redirect("/signin");
}