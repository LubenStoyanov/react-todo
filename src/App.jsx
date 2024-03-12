import { Link } from "react-router-dom";
import NewList from "./components/NewList/NewList";
import "./App.css";
import { useQuery } from "react-query";
import { appLoader } from "./loaders";

function App() {
  var query = useQuery({ queryKey: ["lists"], queryFn: appLoader });

  if (query.isLoading) {
    return <h1>...loading</h1>;
  }

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h1>My lists</h1>
      </header>
      <main className="app-main">
        <ul>
          {query.data.map((list) => (
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
