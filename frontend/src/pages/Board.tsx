import BoardMenu from "@/components/board/BoardMenu";
import { Plus } from "lucide-react";

export default function Board() {
  return (
    <>
      <BoardMenu />
      <main className="">
        <div className="mt-10 ml-10">
          <div className="bg-blue-100 border-2 border-gray-400 shadow-inner rounded-lg p-8 text-center w-96">
            <p className="text-gray-700 text-xl font-bold mb-6">
              This board doesn’t have any columns yet
            </p>
            <button className="bg-blue-400 cursor-pointer hover:bg-blue-500 border-2 border-gray-300 shadow-inner px-5 py-3 text-white font-bold rounded-sm text-sm active:shadow-none active:translate-y-0.5 flex items-center gap-2 mx-auto">
              <Plus className="w-5 h-5" />
              Create first column
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
