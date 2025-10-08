import { Navigate, Outlet } from "react-router";
import BoardMenu from "./components/board/BoardMenu";
import Navbar from "./components/layout/Navbar";
import Taskbar from "./components/layout/Taskbar";
import { useAuth } from "./context/auth.context";

function App() {
  const { user } = useAuth();
  console.log("HOLA");
  if (!user) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      <Outlet />
      <Taskbar />
    </>
  );
}

export default App;
