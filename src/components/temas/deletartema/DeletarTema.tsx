import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
    const navigate = useNavigate();
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
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
            ToastAlerta("Você precisa estar logado!", "erro");
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    async function deletarTema() {
        setIsLoading(true);

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            ToastAlerta("Tema apagado com sucesso!", "sucesso");
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao deletar o tema.", "erro");
            }
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/temas");
    }

    return (
        <div className="relative h-screen group">
          
            <img
                src="https://i.imgur.com/tiYV1Db.jpeg"
                alt="Imagem de Fundo"
                className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg text-center">
                    <h1 className="text-4xl font-bold text-[#394867] mb-6">Deletar Tema</h1>
                    <p className="text-lg text-[#394867] mb-4">
                        Você tem certeza de que deseja apagar o tema a seguir?
                    </p>

                    <div className="border rounded-lg overflow-hidden mb-4">
                        <header className="py-3 px-4 bg-[#394867] text-white font-bold text-lg">
                            Tema
                        </header>
                        <p className="py-6 px-4 text-[#C2185B] text-xl bg-[#FFF9F9]">
                            {tema.descricao}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="w-full bg-[#C2185B] text-white font-bold py-3 rounded-lg hover:bg-[#E91E63] transition-transform transform hover:scale-105"
                            onClick={retornar}
                        >
                            Não
                        </button>
                        <button
                            className="w-full bg-[#394867] text-white font-bold py-3 rounded-lg hover:bg-[#2F3B56] transition-transform transform hover:scale-105 flex justify-center items-center"
                            onClick={deletarTema}
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

export default DeletarTema;
