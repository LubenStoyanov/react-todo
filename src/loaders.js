export async function appLoader() {
  var res = await fetch(import.meta.env.VITE_API_URL);
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return res.json();
}

export async function taskListLoader({ queryKey }) {
  var listName = queryKey[1];
  var res = await fetch(`${import.meta.env.VITE_API_URL}/${listName}`);
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return res.json();
}
