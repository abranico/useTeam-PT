import { Outlet } from "react-router";
import BoardMenu from "./components/board/BoardMenu";
import Navbar from "./components/layout/Navbar";
import Taskbar from "./components/layout/Taskbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Taskbar />
    </>
  );
}

export default App;
