import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Share2 } from "lucide-react";

import amaLogo from "../assets/ama-logo.svg";
import { Messages } from "../components/messages.tsx";
import { CreateMessageForm } from "../components/create-message-form.tsx";

export function Room() {
  const { roomId } = useParams();

  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
    }

    toast.info("Link da sala copiado!");
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />

        <span className="text-zinc-500 truncate">
          Código da sala:{" "}
          <span className="text-zinc-300 truncate">{roomId}</span>
        </span>

        <button
          type="submit"
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-300
          px-3 py-1.5 gap-1.5 flex items-center rounded-lg
          font-medium text-sm transition-colors hover:bg-zinc-700"
        >
          Compartilhar <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900"></div>

      <CreateMessageForm />

      <Suspense fallback={<p>Carregando...</p>}>
        <Messages />
      </Suspense>
    </div>
  );
}
