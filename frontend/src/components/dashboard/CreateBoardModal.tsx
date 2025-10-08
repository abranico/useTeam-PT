interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleCreate: (title: string) => void;
}

const CreateBoardModal: React.FC<Props> = ({ onClose, handleCreate }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="w-96 bg-gray-100 border border-gray-400 shadow-[inset_-6px_-6px_0_#fff,inset_6px_6px_0_#808080] rounded-md">
        <div className="bg-gradient-to-r from-[#0055E5] to-[#3A80F6] text-white font-bold text-sm px-3 py-2 rounded-t-sm flex justify-between items-center">
          <span>Crear nuevo Board</span>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-[#c62828] text-white text-xs font-bold rounded-sm flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formdata = new FormData(e.currentTarget);
            const title = formdata.get("title") as string;
            if (title.trim() === "") return;
            handleCreate(title);
            onClose();
          }}
          className="p-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm mb-1">Título del Board:</label>
            <input
              type="text"
              name="title"
              placeholder="Ingresa el título"
              className="w-full border border-gray-400 bg-white px-2 py-2 text-sm shadow-[inset_-2px_-2px_0_#fff,inset_2px_2px_0_#808080] focus:outline-none"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 border border-gray-500 bg-[#ece9d8] shadow-[inset_-4px_-4px_0_#fff,inset_4px_4px_0_#808080] text-sm hover:bg-[#d8d5c8]"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 border border-gray-500 bg-[#ece9d8] shadow-[inset_-4px_-4px_0_#fff,inset_4px_4px_0_#808080] text-sm hover:bg-[#d8d5c8]"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
