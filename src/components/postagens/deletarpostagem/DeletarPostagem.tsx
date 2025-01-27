import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Postagem apagada com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="relative h-screen group">
      {/* Imagem de fundo */}
      <img
        src="https://i.imgur.com/tiYV1Db.jpeg"
        alt="Imagem de Flor"
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md text-center">
          <h1 className="text-4xl font-bold text-[#394867] mb-6">
            Deletar Postagem
          </h1>
          <p className="text-lg font-semibold text-[#394867] mb-6">
            Você tem certeza de que deseja apagar a postagem abaixo?
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold text-[#C2185B] mb-2">
              {postagem.titulo || "Título da postagem"}
            </h4>
            <p className="text-gray-700">{postagem.texto || "Texto da postagem"}</p>
          </div>
          <div className="flex justify-between gap-4">
            <button
              onClick={retornar}
              className="w-1/2 bg-[#C2185B] text-white font-bold py-3 rounded-lg hover:bg-[#E91E63] transition-transform transform hover:scale-105 flex justify-center items-center"
            >
              Não
            </button>
            <button
              onClick={deletarPostagem}
              className="w-1/2 bg-[#394867] text-white font-bold py-3 rounded-lg hover:bg-[#2F3B56] transition-transform transform hover:scale-105 flex justify-center items-center"
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
