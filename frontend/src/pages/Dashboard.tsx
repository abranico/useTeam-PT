import CreateBoardModal from "@/components/dashboard/CreateBoardModal";
import Loader from "@/components/shared/Loader";
import { useAuth } from "@/context/auth.context";
import type { Board } from "@/models/board.model";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const boards = [
  { id: 1, title: "Proyecto Kanban-XP" },
  { id: 2, title: "Ideas" },
  { id: 3, title: "Personal" },
];

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const { apiClient } = useAuth();

  useEffect(() => {
    setLoading(true);
    apiClient!
      .get<Board[]>("boards")
      .then((res) => {
        setBoards(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (title: string) => {
    try {
      setLoading(true);
      const newBoard = await apiClient!.post<Board>("boards", { title });
      setBoards([...boards, newBoard]);
      toast.success("Board creado exitosamente");
    } catch (error) {
      toast.error("Error al crear el board");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ece9d8] font-tahoma p-8">
      {loading && <Loader />}
      <div className="flex items-center gap-12">
        <button
          onClick={() => setModal(true)}
          className="cursor-pointer flex flex-col items-center justify-center w-60 h-60 bg-[#ece9d8] border border-gray-500 rounded-md shadow-[inset_-6px_-6px_0_#fff,inset_6px_6px_0_#808080] hover:bg-[#d8d5c8] text-8xl text-gray-800 font-bold"
        >
          +<span className="text-xl mt-3 font-normal">Nuevo Board</span>
        </button>

        <div className="flex gap-10">
          {boards.map((board) => (
            <Link
              to={`/board/${board.id}`}
              key={board.id}
              className="w-60 h-60 cursor-pointer hover:bg-gray-200 bg-gray-100 border border-gray-300 rounded-md shadow-[inset_-6px_-6px_0_#fff,inset_6px_6px_0_#808080] flex items-center justify-center text-center text-2xl font-bold px-4"
            >
              {board.title}
            </Link>
          ))}
        </div>
      </div>

      {modal && (
        <CreateBoardModal
          isOpen={false}
          onClose={() => setModal(false)}
          handleCreate={handleCreate}
        />
      )}
    </div>
  );
}
