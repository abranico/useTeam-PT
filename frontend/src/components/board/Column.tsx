const Column = () => {
  return (
    <div className="bg-white/70 border border-[var(--color-xp-border)] rounded-md  w-full max-h-[500px] h-full">
      <div
        className="px-3 py-1 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(180deg, #0997ff 0%, #0053ee 50%, #0050ee 51%, #06f 100%)",
          height: "24px",
        }}
      >
        <span className="text-white text-sm font-bold">ToDo</span>
        <div className="flex gap-1">
          <button
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
        <div className="bg-white border border-[var(--color-xp-border)] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#b0b0b0] rounded p-2 mb-2">
          Task example
        </div>
      </div>
    </div>
  );
};

export default Column;
