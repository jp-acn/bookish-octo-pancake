const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : "http://localhost:8000/api";

function normalizeArrayResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.entries)) return payload.entries;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function fetchApiResource(resource) {
  const url = `${API_BASE_URL}/${resource}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeArrayResponse(payload);
}
