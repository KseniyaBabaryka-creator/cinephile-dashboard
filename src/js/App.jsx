import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Header from "./shared/Header.jsx";
import {Outlet} from "react-router-dom";

function App() {

  return (
    <div className="min-h-screen">
      <Header title={"Cinéphile Dashboard"} description={"A reflection of your cinematic journey"} />
      <Outlet />
    </div>
  )
}

export default App
