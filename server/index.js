import express from "express";
import cors from "cors";
import "dotenv/config";
import { createClient } from "@libsql/client";

var app = express();
var port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/v1", async (_, res) => {
  try {
    var client = createClient({
      // eslint-disable-next-line no-undef
      url: process.env.DB_URL,
      // eslint-disable-next-line no-undef
      authToken: process.env.DB_TOKEN,
    });

    var result = await client.execute("SELECT * FROM task_lists;");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/v1/:list", async (req, res) => {
  var listName = req.params.list;

  try {
    var client = createClient({
      // eslint-disable-next-line no-undef
      url: process.env.DB_URL,
      // eslint-disable-next-line no-undef
      authToken: process.env.DB_TOKEN,
    });

    var result = await client.execute({
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

app.delete("/api/v1/:task_list_id/:task_id", async (req, res) => {
  var listId = req.params.task_list_id;
  var taskId = req.params.task_id;
  console.log(listId, taskId);

  try {
    var client = createClient({
      // eslint-disable-next-line no-undef
      url: process.env.DB_URL,
      // eslint-disable-next-line no-undef
      authToken: process.env.DB_TOKEN,
    });

    var result = await client.execute({
      sql: "DELETE FROM tasks WHERE task_id = (:taskId) AND task_list_id = (:listId)",
      args: { taskId: taskId, listId: listId },
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/v1/:task_list_id/:task_id", async (req, res) => {
  var taskId = req.params.task_id;
  var taskListId = req.params.task_list_id;
  var status = req.body.status;

  try {
    var client = createClient({
      // eslint-disable-next-line no-undef
      url: process.env.DB_URL,
      // eslint-disable-next-line no-undef
      authToken: process.env.DB_TOKEN,
    });

    var result = await client.execute({
      sql: "UPDATE tasks SET status = (:status) WHERE task_id = (:taskId) AND task_list_id = (:taskListId)",
      args: { taskId: taskId, taskListId: taskListId, status: status ? 0 : 1 },
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/v1/update/:task_list_id/:task_id", async (req, res) => {
  var taskId = req.params.task_id;
  var taskListId = req.params.task_list_id;
  var name = req.body.name;
  var dueDate = req.body.dueDate;

  try {
    var client = createClient({
      // eslint-disable-next-line no-undef
      url: process.env.DB_URL,
      // eslint-disable-next-line no-undef
      authToken: process.env.DB_TOKEN,
    });

    var result = await client.execute({
      sql: "UPDATE tasks SET name = (:name), due_date = (:dueDate) WHERE task_id = (:taskId) AND task_list_id = (:taskListId)",
      args: {
        taskId: taskId,
        taskListId: taskListId,
        name: name,
        dueDate: dueDate,
      },
    });
    console.log("update task", result);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Server running on :${port}`));
