import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

interface CardTemasProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="border border-gray-300 shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
      {/* Cabeçalho Tema (Texto Rosa) */}
      <header className="flex w-full bg-[#FFF9F9] py-3 px-4 items-center">
        <h3 className="text-lg font-bold text-[#C2185B] uppercase">Tema</h3>
      </header>

      {/* Descrição do Tema */}
      <p className="p-6 text-3xl bg-white text-[#394867] h-full">
        {tema.descricao || "Descrição do Tema"}
      </p>

      {/* Botões Editar e Deletar */}
      <div className="flex">
        <Link
          to={`/editartema/${tema.id}`}
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
          to={`/deletartema/${tema.id}`}
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

export default CardTemas;
