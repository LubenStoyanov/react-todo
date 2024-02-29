export async function deleteTask(listId, taskId) {
  console.log(taskId, listId);
  var res = await fetch(`${import.meta.env.VITE_API_URL}/${listId}/${taskId}`, {
    method: "DELETE",
  });
  var data = await res.json();
  console.log(data);
  return data;
}

export async function updateTaskStatus(taskListId, taskId, status) {
  console.log(taskListId, taskId, status);
  await fetch(`${import.meta.env.VITE_API_URL}/${taskListId}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status }),
  });
}

export async function updateTask(taskListId, taskId, name, dueDate) {
  console.log("updateTask");
  console.log(taskListId, taskId, name, dueDate);

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
