import { useAuth } from "@/context/auth.context";
import type { Column } from "@/models/column.model";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import type { User } from "@/models/user.model";
import TaskCard from "../task/TaskCard";
import type { Task } from "@/models/task.model";

interface Props {
  column: Column;
  collaborators: User[];
}

const Column = ({ column, collaborators }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modal, setModal] = useState(false);

  const { apiClient } = useAuth();

  useEffect(() => {
    apiClient!.get<Task[]>(`tasks/column/${column.id}`).then((res) => {
      console.log(res);
      setTasks(res);
    });
  }, []);

  const handleCreateTask = async (
    title: string,
    description: string,
    assignedToId: string | null
  ) => {
    const newTaskValues = {
      title,
      description,
      columnId: column.id,
      assignedToId,
    };
    try {
      const newTask = await apiClient!.post<Task>(`tasks`, newTaskValues);
      setTasks([...tasks, newTask]);
      toast.success("Tarea creada exitosamente");
    } catch (error) {
      toast.error("Error al crear la tarea");
    }
  };

  return (
    <div className="bg-white/70 border border-[var(--color-xp-border)] rounded-md  w-full max-w-[400px] h-[500px]">
      <div
        className="px-3 py-1 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(180deg, #0997ff 0%, #0053ee 50%, #0050ee 51%, #06f 100%)",
          height: "24px",
        }}
      >
        <span className="text-white text-sm font-bold">{column.title}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setModal(true)}
            className="w-4 h-4 flex items-center justify-center text-xs"
            style={{
              background: "linear-gradient(180deg, #90ee90 0%, #32cd32 100%)",
              border: "1px solid #fff",
              borderRadius: "2px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="p-2">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-center text-sm text-gray-700 italic">
            No hay tareas aún
          </p>
        )}
        {/* <div className="bg-white border border-[var(--color-xp-border)] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#b0b0b0] rounded p-2 mb-2">
          Task example
        </div> */}
      </div>
      {modal && (
        <CreateTaskModal
          collaborators={collaborators}
          onClose={() => setModal(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Column;
