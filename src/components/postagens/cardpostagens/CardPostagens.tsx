import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
      <div>
        {/* Cabeçalho com foto e nome do usuário */}
        <div className="flex w-full bg-[#FFF9F9] py-3 px-4 items-center gap-4">
          <img
            src={postagem.usuario?.foto || "https://via.placeholder.com/150"}
            className="h-12 w-12 rounded-full border border-gray-300"
            alt={postagem.usuario?.nome || "Usuário"}
          />
          <h3 className="text-lg font-bold text-[#C2185B] uppercase">
            {postagem.usuario?.nome || "Usuário"}
          </h3>
        </div>

        {/* Conteúdo da postagem */}
        <div className="p-4 bg-white">
          <h4 className="text-lg font-semibold text-[#C2185B] mb-2 uppercase">
            {postagem.titulo || "Título da Postagem"}
          </h4>
          <p className="text-gray-700 mb-2">{postagem.texto || "Texto da postagem..."}</p>
          <p className="text-sm text-[#C2185B] font-bold">
            Tema: {postagem.tema?.descricao || "Sem tema"}
          </p>
          <p className="text-sm text-gray-500">
            Data:{" "}
            {postagem.data
              ? new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "full",
                  timeStyle: "short",
                }).format(new Date(postagem.data))
              : "Sem data"}
          </p>
        </div>
      </div>

      {/* Botões Editar e Deletar */}
      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full bg-[#394867] hover:bg-[#2F3B56] flex items-center justify-center py-3 font-bold text-white transition-all group"
        >
          <span className="group-hover:hidden">Editar</span>
          <PencilSimple
            size={24}
            weight="bold"
            className="hidden group-hover:block transition-opacity"
          />
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="w-full bg-[#C2185B] hover:bg-[#A3164B] flex items-center justify-center py-3 font-bold text-white transition-all group"
        >
          <span className="group-hover:hidden">Deletar</span>
          <TrashSimple
            size={24}
            weight="bold"
            className="hidden group-hover:block transition-opacity"
          />
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
