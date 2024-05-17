import Header from "./components/Header"
import Sidebar from "./components/SideNav"
import { Dashboard } from "./pages/Dashboard"


function App() {

  return (
    <div className="flex ">
      {/* Side nav */}
      <Sidebar />

      <div className="w-full">
        {/* Header */}
        <Header />

        {/* Main page */}
        <Dashboard />

      </div>


    </div>
  )
}

export default App
