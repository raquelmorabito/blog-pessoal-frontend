import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import Usuario from "../../models/Usuario";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta(
        "Dados estão inconsistentes. Verifique as informações do cadastro.",
        "erro"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }
    setIsLoading(false);
  }

  return (
    <div className="relative h-screen group">
      {/* Imagem de fundo */}
      <img
        src="https://i.imgur.com/tiYV1Db.jpeg"
        alt="Imagem de Flor"
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Conteúdo central */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md text-center"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-4xl font-bold text-[#394867] mb-6">Cadastrar</h2>
          <div className="flex flex-col w-full gap-4">
            <div>
              <label
                htmlFor="nome"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome completo aqui"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={usuario.nome}
                onChange={atualizarEstado}
              />
            </div>
            <div>
              <label
                htmlFor="usuario"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Usuário
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Exemplo: usuario@usuario.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={usuario.usuario}
                onChange={atualizarEstado}
              />
            </div>
            <div>
              <label
                htmlFor="foto"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Foto
              </label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder="Adicione o link para sua foto de perfil"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={usuario.foto}
                onChange={atualizarEstado}
              />
            </div>
            <div>
              <label
                htmlFor="senha"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Crie uma senha segura"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={usuario.senha}
                onChange={atualizarEstado}
              />
            </div>
            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-[#394867] font-semibold text-left mb-2"
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={confirmaSenha}
                onChange={handleConfirmarSenha}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="w-1/2 bg-[#C2185B] text-white font-bold py-3 rounded-lg hover:bg-[#E91E63] transition-transform transform hover:scale-105"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
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
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
