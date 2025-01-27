import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { RotatingLines } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="relative h-screen group">
      <img
        src="https://i.imgur.com/tiYV1Db.jpeg"
        alt="Imagem de Flor"
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md text-center"
          onSubmit={login}
        >
          <h2 className="text-4xl font-bold text-[#394867] mb-6">Entrar</h2>
          <div className="flex flex-col w-full gap-4">
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
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
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
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#C2185B] text-[#394867]"
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-[#C2185B] text-white font-bold py-3 rounded-lg hover:bg-[#E91E63] transition-transform transform hover:scale-105 flex justify-center items-center"
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
              <span>Entrar</span>
            )}
          </button>

          <hr className="my-6 border-[#C2185B]" />
          <p className="text-[#394867]">
            Ainda não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-[#C2185B] font-semibold hover:underline hover:scale-105 transition-transform transform"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
