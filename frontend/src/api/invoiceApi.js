import { AuthService } from "@/services/authService";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function createInvoice(data) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/invoices`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Invoice creation failed");
  return response.json();
}

export async function getInvoices() {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/invoices`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch invoices");
  return response.json();
}

export async function deleteInvoice(id) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${API_URL}/v1/protected/invoices/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) throw new Error("Deletion failed");
  return response.json();
}

export async function downloadInvoice(id) {
  const token = AuthService.getAccessToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/invoices/${id}/pdf`, {
    method: "POST",
    headers,
  });
  if (!response.ok) throw new Error("Download failed");
  return response.blob();
}

export async function updateInvoiceStatus(id, status) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}/v1/protected/invoices/${id}/status`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    }
  );
  if (!response.ok) throw new Error("Status update failed");
  return response.json();
}

export async function updateInvoice(id, data) {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/invoices/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Update failed");
  return response.json();
}

export async function invoiceSummary() {
  const token = AuthService.getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/protected/invoices/summary`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch invoice summary");
  return response.json();
}

export async function downloadPublicInvoice(invoice) {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(`${API_URL}/v1/public/invoices/generate-pdf`, {
    method: "POST",
    headers,
    body: JSON.stringify(invoice),
  });
  if (!response.ok) throw new Error("Download failed");
  return response.blob();
}
