import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "sucesso");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="w-full bg-[#FFF9F9] shadow-lg py-6">
        <div className="container mx-auto flex justify-between items-center px-8">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-[#C2185B]">
            <Link to="/home" className="hover:underline">
              Blog Pessoal
            </Link>
          </h1>

          {/* Links de Navegação */}
          <nav className="flex items-center gap-4">
            <Link
              to="/postagens"
              className="text-[#C2185B] font-bold px-4 py-2 rounded-lg hover:bg-[#C2185B] hover:text-white transition-all"
            >
              Postagens
            </Link>
            <Link
              to="/temas"
              className="text-[#C2185B] font-bold px-4 py-2 rounded-lg hover:bg-[#C2185B] hover:text-white transition-all"
            >
              Temas
            </Link>
            <Link
              to="/cadastrartema"
              className="text-[#C2185B] font-bold px-4 py-2 rounded-lg hover:bg-[#C2185B] hover:text-white transition-all"
            >
              Cadastrar Tema
            </Link>
            <Link
              to="/perfil"
              className="text-[#C2185B] font-bold px-4 py-2 rounded-lg hover:bg-[#C2185B] hover:text-white transition-all"
            >
              Perfil
            </Link>
            <button
              onClick={logout}
              className="text-[#C2185B] font-bold px-4 py-2 rounded-lg hover:bg-[#C2185B] hover:text-white transition-all"
            >
              Sair
            </button>
          </nav>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
