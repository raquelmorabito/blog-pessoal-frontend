import {InstagramLogo, LinkedinLogo, GithubLogo, TiktokLogo } from '@phosphor-icons/react';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {

    let data = new Date().getFullYear();

    const { usuario } = useContext(AuthContext);

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="flex justify-center bg-[#FFF9F9] text-[#C2185B]">
                <div className="container flex flex-col items-center py-6">
                    <p className='text-lg font-bold'>
                        Raquel Morabito | Copyright: {data}
                    </p>
                    <p className='text-base'>Acesse minhas redes sociais:</p>
                    <div className='flex gap-4 mt-2'>
                        <a href="https://www.linkedin.com/in/raquelmorabito/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-900 transition-all">
                            <LinkedinLogo size={32} weight='bold' />
                        </a>
                        <a href="https://www.instagram.com/raquelmorabito/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-900 transition-all">
                            <InstagramLogo size={32} weight='bold' />
                        </a>
                        <a href="https://github.com/raquelmorabito" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-900 transition-all">
                            <GithubLogo size={32} weight='bold' />
                        </a>
                        <a href="https://www.tiktok.com/@raquelmorabito" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-900 transition-all">
                            <TiktokLogo size={32} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Footer;
