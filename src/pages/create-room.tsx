import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import amaLogo from "../assets/ama-logo.svg";
import { createRoom } from "../http/create-room";

export function CreateRoom() {
  const navigate = useNavigate();

  async function handleCreateRoom(data: FormData) {
    const theme = data.get("theme")?.toString();

    if (!theme) {
      return;
    }

    try {
      const { roomId } = await createRoom({ theme });

      navigate(`/room/${roomId}`);
    } catch {
      toast.error("Falha ao criar sala");
    }
  }

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[450px] flex flex-col gap-6">
        <img src={amaLogo} alt="AMA" className="h-10" />

        <p className="leading-relaxed text-zinc-300 text-center">
          Create a room to start a conversation with your audience. Share the
          link to invite people to join the room.
        </p>

        <form
          className="flex items-center gap-2 bg-zin-900 p-2 rounded-xl 
          border border-zinc-800 focus-within:border-orange-400"
          action={handleCreateRoom}
        >
          <input
            type="text"
            name="theme"
            placeholder="Nome da sala"
            className="flex-1 text-sm bg-transparent mx-2 outline-none
            text-zinc-100 placeholder-zinc-500"
            autoComplete="off"
            required
          />

          <button
            type="submit"
            className="bg-orange-400 text-orange-950
          px-3 py-1.5 gap-1.5 flex items-center rounded-lg
          font-medium text-sm transition-colors hover:bg-orange-500"
          >
            Criar sala <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  );
}
