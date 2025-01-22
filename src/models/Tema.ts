import Postagem from "../models/Postagem";

export default interface Tema {
    id: number;
    descricao: string;
    postagem?: Postagem | null;
}