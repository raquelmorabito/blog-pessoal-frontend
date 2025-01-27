import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { AuthContext } from '../../contexts/AuthContext';

function Perfil() {
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === '') {
            ToastAlerta('Você precisa estar logado', 'erro');
            navigate('/');
        }
    }, [usuario.token]);

    return (
        <div className="container mx-auto m-4 rounded-2xl overflow-hidden bg-white shadow-lg">
            <img
                className="w-full h-72 object-cover border-b-8 border-[#C2185B]" // rosa no border
                src="https://i.imgur.com/tiYV1Db.jpeg"
                alt="Capa do Perfil"
            />

            <img
                className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
                src={usuario.foto}
                alt={`Foto de perfil de ${usuario.nome}`}
            />

            <div className="relative mt-[-6rem] h-72 flex flex-col bg-[#394867] text-white text-2xl items-center justify-center p-4 rounded-2xl">
                <p className="font-bold text-lg">Nome: <span className="text-[#C2185B]">{usuario.nome}</span></p>
                <p className="font-semibold text-lg">Email: <span className="text-[#C2185B]">{usuario.usuario}</span></p>
            </div>
        </div>
    );
}

export default Perfil;
