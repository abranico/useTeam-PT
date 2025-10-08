import React, { useState } from "react";

interface Collaborator {
  id: string;
  name: string;
}

interface Props {
  collaborators: Collaborator[];
  onClose: () => void;
  onCreate: (
    title: string,
    description: string,
    assignedTo: string | null
  ) => void;
}

export default function CreateTaskModal({
  collaborators,
  onClose,
  onCreate,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title, description, assignedTo);
    onClose();
  };
  console.log({ collaborators });
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="w-[480px] bg-[#ece9d8] border-2 border-gray-500 rounded-lg shadow-[inset_-4px_-4px_0_#fff,inset_4px_4px_0_#808080] font-tahoma text-gray-900">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#0055E5] to-[#3A80F6] text-white px-4 py-2 rounded-t-md">
          <h2 className="text-xl font-bold">Nueva tarea</h2>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-[#c62828] text-white text-xs font-bold rounded-sm flex items-center justify-center hover:bg-[#b71c1c]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block mb-1 text-sm font-bold">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-500 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Escribe el título de la tarea"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-28 border border-gray-500 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              placeholder="Descripción opcional"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold">Asignar a</label>
            <select
              value={assignedTo || ""}
              onChange={(e) =>
                setAssignedTo(e.target.value === "" ? null : e.target.value)
              }
              className="w-full border border-gray-500 rounded-sm px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Sin asignar</option>
              {collaborators?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white border border-gray-600 shadow-inner px-5 py-2 rounded-sm text-sm font-bold"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 border border-gray-400 shadow-inner px-4 py-2 rounded-sm text-sm font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
