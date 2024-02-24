import "./App.css";
import TaskList from "./components/Tasklist/TaskList";
import AddTask from "./components/AddTask/AddTask";

function App() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <h1>Tasks</h1>
      </header>

      <main>
        <p className="completion-info">0 done • delete</p>
        <TaskList />
      </main>

      <footer>
        <AddTask />
      </footer>
    </div>
  );
}

export default App;
