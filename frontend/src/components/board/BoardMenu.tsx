import type { Board } from "@/models/board.model";

interface Props {
  board: Board;
  handleCreateColumnModal: () => void;
}

const BoardMenu = ({ board, handleCreateColumnModal }: Props) => {
  const users = ["nicoabra", "María", "Luis"];
  const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"];
  return (
    <nav className="flex items-center justify-between px-10 py-2 border-b border-gray-500 bg-zinc-100 text-sm select-none">
      {/* Menú tipo Windows XP */}

      {/* Nombre del tablero */}
      <span className="font-bold text-blue-800 text-lg px-2">
        {board.title}
      </span>

      {/* Opciones del tablero */}
      <div className="flex items-center gap-2">
        <ul className="flex items-center gap-2 px-2 mr-5">
          {users.map((u, idx) => {
            // Elegir color basado en índice
            const bgColor = colors[idx % colors.length];

            return (
              <li
                key={u}
                className="w-8 h-8 flex items-center justify-center rounded-full  text-sm font-bold shadow-inner"
                title={u}
                style={{ backgroundColor: bgColor }}
              >
                {u[0].toUpperCase()}
              </li>
            );
          })}
        </ul>
        <button
          onClick={handleCreateColumnModal}
          className="cursor-pointer bg-zinc-200 hover:bg-blue-500 hover:text-white border-2 border-gray-300 shadow-inner px-2 py-1 rounded-sm text-sm font-bold active:shadow-none active:translate-y-0.5"
        >
          Add Column
        </button>
        <button className="cursor-pointer bg-zinc-200 hover:bg-blue-500 hover:text-white border-2 border-gray-300 shadow-inner px-2 py-1 rounded-sm text-sm font-bold active:shadow-none active:translate-y-0.5">
          Settings
        </button>
      </div>
    </nav>
  );
};

export default BoardMenu;
