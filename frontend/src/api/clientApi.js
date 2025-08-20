import { AuthService } from "@/services/authService";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function createClient(data) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/clients`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
}

export async function getClients() {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/clients`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}

export async function updateClient(id, data) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/clients/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Update failed");
  return response.json();
}

export async function deleteClient(id) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/clients/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) throw new Error("Deletion failed");
  return response.json();
}
