import express from "express";
import cors from "cors";
import "dotenv/config";
import { createClient } from "@libsql/client";

var clientDB = createClient({
  // eslint-disable-next-line no-undef
  url: process.env.DB_URL,
  // eslint-disable-next-line no-undef
  authToken: process.env.DB_TOKEN,
});

var app = express();
var port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
})

app.get("/api/v1", async (_, res) => {
  try {
    var result = await clientDB.execute("SELECT * FROM task_lists;");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/v1/createList", async (req, res) => {
  var { name } = req.body;

  try {
    await clientDB.execute({
      sql: "INSERT INTO task_lists (name) VALUES (:name)",
      args: { name: name },
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/v1/createTask", async (req, res) => {
  var { name, dueDate, listId } = req.body;

  try {
    await clientDB.execute({
      sql: "INSERT INTO tasks (name, due_date, task_list_id) VALUES (:name, :dueDate, :taskId)",
      args: {
        name: name,
        dueDate: dueDate,
        taskId: listId,
      },
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/v1/:listName", async (req, res) => {
  var { listName } = req.params;

  try {
    var result = await clientDB.execute({
      sql: `
        SELECT tasks.*
        FROM tasks
        JOIN task_lists ON tasks.task_list_id = task_lists.task_list_id
        WHERE task_lists.name = (:name)
      `,
      args: { name: listName.charAt(0).toUpperCase() + listName.slice(1) },
    });

    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/v1/:listId/:taskId", async (req, res) => {
  var { taskId, listId } = req.params;

  try {
    var result = await clientDB.execute({
      sql: "DELETE FROM tasks WHERE task_id = (:taskId) AND task_list_id = (:listId)",
      args: { taskId: taskId, listId: listId },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/v1/:listId/:taskId", async (req, res) => {
  var { taskId, listId } = req.params;
  var { status } = req.body;

  try {
    var result = await clientDB.execute({
      sql: "UPDATE tasks SET status = (:status) WHERE task_id = (:taskId) AND task_list_id = (:listId)",
      args: { taskId: taskId, listId: listId, status: status ? 0 : 1 },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/v1/update/:listId/:taskId", async (req, res) => {
  var { taskId, listId } = req.params;
  var { name, dueDate } = req.body;

  try {
    var result = await clientDB.execute({
      sql: "UPDATE tasks SET name = (:name), due_date = (:dueDate) WHERE task_id = (:taskId) AND task_list_id = (:listId)",
      args: {
        taskId: taskId,
        listId: listId,
        name: name,
        dueDate: dueDate,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Server running on :${port}`));
