export async function createTask(name, dueDate, listId) {
  await fetch(`${import.meta.env.VITE_API_URL}/createTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, dueDate, listId }),
  });
}

export async function createList(name) {
  var res = await fetch(`${import.meta.env.VITE_API_URL}/createList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  console.log("create list ok", res.ok);
}

export async function deleteTask(listId, taskId) {
  var res = await fetch(`${import.meta.env.VITE_API_URL}/${listId}/${taskId}`, {
    method: "DELETE",
  });
  var data = await res.json();
  return data;
}

export async function updateTaskStatus(taskListId, taskId, status) {
  await fetch(`${import.meta.env.VITE_API_URL}/${taskListId}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status }),
  });
}

export async function updateTask(taskListId, taskId, name, dueDate) {
  await fetch(
    `${import.meta.env.VITE_API_URL}/update/${taskListId}/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, dueDate }),
    }
  );
}
