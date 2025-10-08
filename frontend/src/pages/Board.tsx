import BoardMenu from "@/components/board/BoardMenu";
import Column from "@/components/board/Column";
import CreateColumnModal from "@/components/board/CreateColumnModal";
import Loader from "@/components/shared/Loader";
import { useAuth } from "@/context/auth.context";
import { Board } from "@/models/board.model";
import type { Column as ColumnType } from "@/models/column.model";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export default function Board() {
  const [board, setBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { apiClient } = useAuth();
  const [createColumnModal, setCreateColumnModal] = useState(false);

  useEffect(() => {
    apiClient!
      .get<Board>(`boards/${id}`)
      .then((res) => setBoard(res))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    apiClient!
      .get<ColumnType[]>(`columns/board/${id}`)
      .then((res) => {
        console.log(res);
        setColumns(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreateColumnModal = () => {
    setCreateColumnModal(true);
  };

  const handleCreateColumn = async (title: string) => {
    try {
      await apiClient!
        .post<ColumnType>(`columns`, { title, boardId: id })
        .then((res) => setColumns([...columns, res]));
      toast.success("Columna creada exitosamente");
    } catch (error) {
      toast.error("Error al crear el board");
    }
  };

  if (loading) return <Loader />;

  if (!board) return <div>Board not found</div>;

  return (
    <>
      <BoardMenu
        board={board}
        handleCreateColumnModal={handleCreateColumnModal}
      />
      <main className="">
        <div className="mt-10 ml-10 flex gap-15 justify-center">
          {columns?.length > 0 ? (
            columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                collaborators={board.collaborators}
              />
            ))
          ) : (
            <div className="bg-blue-100 border-2 border-gray-400 shadow-inner rounded-lg p-8 text-center w-96">
              <p className="text-gray-700 text-xl font-bold mb-6">
                Este tablero no tiene ninguna columna aun
              </p>
              <button className="bg-blue-400 cursor-pointer hover:bg-blue-500 border-2 border-gray-300 shadow-inner px-5 py-3 text-white font-bold rounded-sm text-sm active:shadow-none active:translate-y-0.5 flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Crear primera columna
              </button>
            </div>
          )}
        </div>
      </main>
      {createColumnModal && (
        <CreateColumnModal
          onClose={() => setCreateColumnModal(false)}
          handleCreate={handleCreateColumn}
        />
      )}
    </>
  );
}
