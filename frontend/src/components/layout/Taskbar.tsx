import { Globe, Bell, Volume2 } from "lucide-react";

const Taskbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#a3b8cc] to-[#c8d8e4] border-t-2 border-[#8ea6b4] shadow-inner flex items-center justify-between px-2 text-sm font-sans">
      {/* Botón Start */}
      {/* <button className="flex items-center gap-2 bg-gradient-to-b from-[#e0e0e0] to-[#c0c0c0] border border-[#7a8a9a] px-3 py-1 rounded-sm shadow-inner hover:brightness-95 active:translate-y-0.5">
        🪟 <span className="font-semibold">Start</span>
      </button> */}

      {/* Área de notificaciones */}
      <div className="flex justify-end w-full items-center gap-3 pr-2">
        <Globe
          className="w-4 h-4 text-gray-700 cursor-pointer hover:text-black"
          xlinkTitle="a"
        />
        <Bell
          className="w-4 h-4 text-gray-700 cursor-pointer hover:text-black"
          xlinkTitle="Notifications"
        />
        <Volume2
          className="w-4 h-4 text-gray-700 cursor-pointer hover:text-black"
          xlinkTitle="Sound"
        />
        <div className="bg-[#e8f0f8] border border-[#9aa8b8] px-2 py-0.5 rounded-sm shadow-inner">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
