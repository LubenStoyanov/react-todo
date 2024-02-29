import { createClient } from "@libsql/client";

export async function updateTask(taskId, formTitle, formDueDate) {
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  await client.execute({
    sql: "UPDATE tasks SET title = (:title), dueDate = (:dueDate) WHERE task_id = (:taskId)",
    args: { taskId: taskId, title: formTitle, dueDate: formDueDate },
  });
}

export async function deleteTask(taskId) {
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  await client.execute({
    sql: "DELETE FROM tasks WHERE task_id = (:taskId)",
    args: { taskId: taskId },
  });
}

export async function updateTaskStatus(taskId, status) {
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  await client.execute({
    sql: "UPDATE tasks SET status = (:status) WHERE task_id = (:taskId)",
    args: { taskId: taskId, status: status ? 0 : 1 },
  });
}

export async function deleteCompletedTasks() {
  var client = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env.VITE_DB_TOKEN,
  });

  await client.execute({
    sql: "DELETE FROM tasks WHERE status = (:status)",
    args: { status: 1 },
  });
}
