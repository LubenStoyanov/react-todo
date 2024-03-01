import { Link, useLoaderData } from "react-router-dom";
import NewList from "./components/NewList/NewList";
import "./App.css";

function App() {
  var rows = useLoaderData();

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h1>My lists</h1>
      </header>
      <main className="app-main">
        <ul>
          {rows.map((list) => (
            <li key={list.task_list_id}>
              <Link to={`${list.name.toLowerCase()}/${list.task_list_id}`}>
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="app-footer">
        <NewList />
      </footer>
    </div>
  );
}

export default App;
