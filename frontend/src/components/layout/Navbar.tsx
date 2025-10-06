import { LayoutDashboard, User2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-between px-10 h-16
    bg-blue-600"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-blue-600 text-xl font-bold">
          K
        </div>
        <span className="text-white text-xl font-bold select-none">
          Kanban-XP
        </span>
      </div>

      <div className="flex  gap-5">
        <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 border-2 border-gray-300 shadow-inner px-3 py-1 flex items-center gap-2 text-white font-bold text-sm select-none active:shadow-none active:translate-y-0.5 rounded-sm">
          <LayoutDashboard className="w-4 h-4" />
          Boards
        </button>

        <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 border-2 border-gray-300 shadow-inner px-3 py-1 flex items-center gap-2 text-white font-bold text-sm select-none active:shadow-none active:translate-y-0.5 rounded-sm">
          <User2 className="w-4 h-4" />
          nicoabra
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
