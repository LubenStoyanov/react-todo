export async function appLoader() {
  var res = await fetch(import.meta.env.VITE_API_URL);
  var data = await res.json();
  return data;
}

export async function taskListLoader({ params }) {
  var res = await fetch(`${import.meta.env.VITE_API_URL}/${params.listName}`);
  var data = await res.json();
  return data;
}
