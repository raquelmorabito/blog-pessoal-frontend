import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
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
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem atualizada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a Postagem", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Postagem", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="relative h-screen group">
      {/* Imagem de fundo */}
      <img
        src="https://i.imgur.com/tiYV1Db.jpeg"
        alt="Imagem de Flor"
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md text-center"
          onSubmit={gerarNovaPostagem}
        >
          <h2 className="text-4xl font-bold text-[#394867] mb-6">
            {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
          </h2>
          <div className="flex flex-col w-full gap-4">
            <div>
              <label
                htmlFor="titulo"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                placeholder="Digite o título"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={postagem.titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div>
              <label
                htmlFor="texto"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Texto
              </label>
              <input
                type="text"
                id="texto"
                name="texto"
                placeholder="Digite o texto da postagem"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={postagem.texto}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div>
              <label
                htmlFor="tema"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Tema
              </label>
              <select
                id="tema"
                name="tema"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
              >
                <option value="" selected disabled>
                  Selecione um Tema
                </option>
                {temas.map((tema) => (
                  <option key={tema.id} value={tema.id}>
                    {tema.descricao}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-[#C2185B] text-white font-bold py-3 rounded-lg hover:bg-[#E91E63] transition-transform transform hover:scale-105 flex justify-center items-center"
            disabled={carregandoTema}
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
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPostagem;
