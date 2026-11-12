export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";


async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

// GET
export function fetchSupplements() {
  return request("/supplements");
}

//POST
export function createSupplement(supplement) {
  return request("/supplements", {
    method: "POST",
    body: JSON.stringify(supplement),
  });
}

// PATCH
export function updateSupplement(id, changes) {
  return request(`/supplements/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

// DELETE
export function deleteSupplement(id) {
  return request(`/supplements/${id}`, { method: "DELETE" });
}