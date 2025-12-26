import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Header from "./shared/Header.jsx";
import {Outlet} from "react-router-dom";

function App() {

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
