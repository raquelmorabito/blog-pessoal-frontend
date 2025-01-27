import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro');
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/temas")
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Tema foi atualizado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o tema.', 'erro');
                }

            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Tema foi cadastrado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                   ToastAlerta('Erro ao cadastrar o tema.', 'erro');
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="relative h-screen flex items-center justify-center group">
         
            <img
                src="https://i.imgur.com/tiYV1Db.jpeg"
                alt="Imagem de Fundo"
                className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative z-10 flex items-center justify-center w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <div className="w-full">
                    <h1 className="text-4xl font-bold text-[#394867] mb-6 text-center">
                        {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
                    </h1>

                    <form className="flex flex-col gap-6" onSubmit={gerarNovoTema}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="descricao" className="text-[#C2185B]">
                                Descrição do Tema
                            </label>
                            <input
                                type="text"
                                placeholder="Descreva aqui seu tema"
                                name='descricao'
                                className="border-2 border-slate-700 rounded p-2"
                                value={tema.descricao}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="py-2 w-full bg-[#C2185B] text-white font-bold rounded-lg hover:bg-[#E91E63] transition-transform transform hover:scale-105"
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
                                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormTema;
