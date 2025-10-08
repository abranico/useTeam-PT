import type { Task } from "@/models/task.model";
import React, { useState } from "react";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-[#ece9d8] border border-[#808080] rounded-sm shadow-[inset_-2px_-2px_0_#fff,inset_2px_2px_0_#b0b0b0] p-2 mb-2 hover:bg-[#e0ddd0] transition-all"
      >
        <p className="font-bold text-sm text-gray-800">{task.title}</p>
        <p className="text-xs text-gray-700 italic">
          {task.assignedTo
            ? `Asignada a: ${task.assignedTo.name}`
            : "Sin asignar"}
        </p>
        {task.description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {open && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="w-[480px] bg-[#ece9d8] border-2 border-gray-500 rounded-lg shadow-[inset_-4px_-4px_0_#fff,inset_4px_4px_0_#808080] font-tahoma text-gray-900">
            <div className="flex items-center justify-between bg-[#0a246a] text-white px-4 py-2 rounded-t-md">
              <h2 className="text-lg font-bold">Detalles de la tarea</h2>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 text-black w-6 h-6 flex items-center justify-center border border-gray-400 hover:bg-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">Título:</p>
                <p className="text-sm bg-white border border-gray-400 rounded-sm p-2 shadow-inner">
                  {task.title}
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">
                  Descripción:
                </p>
                <textarea className="text-sm w-full bg-white border border-gray-400 rounded-sm p-2 shadow-inner whitespace-pre-line">
                  {task.description || "Sin descripción"}
                </textarea>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">
                  Asignada a:
                </p>
                <p className="text-sm bg-white border border-gray-400 rounded-sm p-2 shadow-inner">
                  {task.assignedTo?.name || "Sin asignar"}
                </p>
              </div>
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 border border-gray-400 shadow-inner px-4 py-2 rounded-sm text-sm font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
