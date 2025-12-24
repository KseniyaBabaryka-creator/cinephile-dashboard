import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Header from "./shared/Header.jsx";

function App() {

  return (
    <div className="min-h-screen">
      <Header title={"Cinéphile Dashboard"} description={"A reflection of your cinematic journey"} />
      <Dashboard />
    </div>
  )
}

export default App
