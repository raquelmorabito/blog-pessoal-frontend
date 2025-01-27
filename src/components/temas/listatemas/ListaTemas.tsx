import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
    const navigate = useNavigate();
    const [temas, setTemas] = useState<Tema[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const buscarTemas = async () => {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
                ToastAlerta('Sessão expirada. Faça login novamente.', 'erro');
            } else {
                ToastAlerta('Erro ao carregar os temas.', 'erro');
            }
        }
    };

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
    }, [token]); 

    return (
        <>
            {temas.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTemas;
