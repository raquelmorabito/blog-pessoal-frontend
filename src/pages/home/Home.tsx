import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
    return (
        <>
            <div className="relative group">
                <img
                    src="https://i.imgur.com/tiYV1Db.jpeg"
                    alt="Imagem de Flor"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative flex justify-center items-center h-[50vh]">
                    <div className="bg-white rounded-lg p-8 shadow-lg text-center flex flex-col items-center">
                        <h2 className="text-5xl font-bold text-[#C2185B]">
                            Seja Bem-Vinde!
                        </h2>
                        <p className="text-2xl text-[#394867] mt-4">
                            Expresse aqui seus pensamentos e opiniões.
                        </p>
                       
                        <div className="mt-8">
                            <ModalPostagem />
                        </div>
                    </div>
                </div>
            </div>
      
            <div className="container mx-auto py-8">
                <ListaPostagens />
            </div>
        </>
    );
}

export default Home;
