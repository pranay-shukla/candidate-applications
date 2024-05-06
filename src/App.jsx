import JobList from "./components/JobList";
import Filters from "./components/Filters";
import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Filters></Filters>
      <JobList></JobList>
    </>
  );
}

export default App;
