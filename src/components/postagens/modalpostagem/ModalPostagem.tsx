import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';
import { PencilSimple } from "@phosphor-icons/react";

import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css';

function ModalPostagem() {
    return (
        <Popup
            trigger={
                <button className="relative flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-lg text-lg shadow-md font-bold text-[#394867] hover:shadow-xl hover:scale-110 hover:text-[#C2185B] transition-transform duration-300 group">
                    <PencilSimple
                        className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        size={24}
                        weight="bold"
                    />
                    <span className="ml-6">Nova Postagem</span>
                </button>
            }
            modal
        >
            <FormPostagem />
        </Popup>
    );
}

export default ModalPostagem;
