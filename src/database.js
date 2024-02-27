import { createClient } from "@libsql/client";

export async function updateTask(id, formTitle, formDueDate) {
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  try {
    await client.execute({
      sql: "UPDATE tasks SET title = (:title), dueDate = (:dueDate) WHERE id = (:id)",
      args: { id: id, title: formTitle, dueDate: formDueDate },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(id) {
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  try {
    await client.execute({
      sql: "DELETE FROM tasks WHERE id = (:id)",
      args: { id: id },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTaskStatus(id, status, e) {
  console.log(e.target.checked);
  e.target.checked = !e.target.checked;
  console.log(e.target.checked);
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  try {
    await client.execute({
      sql: "UPDATE tasks SET status = (:status) WHERE id = (:id)",
      args: { id: id, status: status ? 0 : 1 },
    });
  } catch (error) {
    console.error(error);
  }
}
