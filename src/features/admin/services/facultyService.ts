/**
 * Faculty Service Layer
 *
 * Placeholder async functions that simulate API calls.
 * A backend developer can replace the implementations with
 * real fetch/axios calls to a REST or GraphQL endpoint.
 */

export interface Faculty {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateFacultyPayload {
  name: string;
}

export interface UpdateFacultyPayload {
  name: string;
}

// --------------- In-memory store (replace with real API) ---------------

let store: Faculty[] = [
  { id: "1", name: "Faculty of Science", createdAt: new Date().toISOString() },
  { id: "2", name: "Faculty of Arts", createdAt: new Date().toISOString() },
  { id: "3", name: "Faculty of Engineering", createdAt: new Date().toISOString() },
];

let nextId = 4;

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// --------------- Public API ---------------

export async function getFaculties(): Promise<Faculty[]> {
  await delay();
  return [...store];
}

export async function createFaculty(data: CreateFacultyPayload): Promise<Faculty> {
  await delay();
  const faculty: Faculty = {
    id: String(nextId++),
    name: data.name,
    createdAt: new Date().toISOString(),
  };
  store = [...store, faculty];
  return faculty;
}

export async function updateFaculty(id: string, data: UpdateFacultyPayload): Promise<Faculty> {
  await delay();
  const idx = store.findIndex((f) => f.id === id);
  if (idx === -1) throw new Error("Faculty not found");
  const updated = { ...store[idx], ...data };
  store = store.map((f) => (f.id === id ? updated : f));
  return updated;
}

export async function deleteFaculty(id: string): Promise<void> {
  await delay();
  store = store.filter((f) => f.id !== id);
}
