import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Share2 } from "lucide-react";

import { Message } from "../components/message.tsx";
import amaLogo from "../assets/ama-logo.svg";

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

      <form
        className="flex items-center gap-2 bg-zin-900 p-2 rounded-xl 
          border border-zinc-800 focus-within:border-orange-400"
      >
        <input
          type="text"
          name="theme"
          placeholder="Qual a sua pergunta?"
          className="flex-1 text-sm bg-transparent mx-2 outline-none
            text-zinc-100 placeholder-zinc-500"
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-orange-400 text-orange-950
          px-3 py-1.5 gap-1.5 flex items-center rounded-lg
          font-medium text-sm transition-colors hover:bg-orange-500"
        >
          Criar pergunta <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="list-decimal list-outside px-3 space-y-8">
        <Message
          text="De onde viemos e para onde vamos?"
          amountOfReactions={100}
          answered
        />
        <Message text="Onde vivem, o que comem?" amountOfReactions={50} />
        <Message text="Pergunta de exemplo?" amountOfReactions={30} />
      </ol>
    </div>
  );
}
