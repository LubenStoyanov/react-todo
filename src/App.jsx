import "./App.css";
import TaskList from "./components/Tasklist/TaskList";
import AddTask from "./components/AddTask/AddTask";
import { useState } from "react";

function App() {
  var [forceRender, setForceRender] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="header">
        <h1>Tasks</h1>
      </header>

      <main>
        <TaskList forceRender={forceRender} setForceRender={setForceRender} />
      </main>

      <footer>
        <AddTask setForceRender={setForceRender} />
      </footer>
    </div>
  );
}

export default App;
