import React from 'react';
import ImgNotFound from "../../assets/NotFound.png";
import { Link } from 'react-router-dom';
import { PATH_HOME } from '../../routes/public/Paths';

interface NotFoundPublicProps {
    message?: string;
    link?: string;
    error?: string;
}

const NotFoundPublic: React.FC<NotFoundPublicProps> = ({ message, link, error }) => {
    return (
        <div className="flex h-full w-full justify-center text-center my-auto">
            <div className=" mx-auto">
                <div className='relative -bottom-16 uppercase'>
                    <span className=' text-5xl font-bold text-primary-500'>
                        ERROR
                    </span>
                </div>
                <div className='relative -bottom-16 uppercase font-bold text-primary-400'>
                    <span className="text-5xl">
                        {error ? error : "404"}
                    </span>
                </div>
                <img src={ImgNotFound} className="w-96 mx-auto" alt="" />
                <div className="relative -top-12">
                    <span className="text-black-500 text-center text-lg -top-10">
                        {message ? message : <div className="grid">
                            <span>Página no encontrada, </span>
                            <span>puede que se haya esfumado en el ciberespacio</span>
                        </div>
                        }
                    </span>
                </div>
                {link ? (
                    <div className='mb-6 relative -top-5'>
                        <Link to={link} className=' bg-primary-600/70 text-primary-100 px-3 py-2 rounded-xl '>
                            Volver a un lugar seguro
                        </Link>
                    </div>
                ) : (
                    <div className='mb-6 relative -top-5'>
                        <Link to={PATH_HOME} className=' bg-primary-600/70 text-primary-100 px-3 py-2 rounded-xl '>
                            Volver al inicio
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotFoundPublic;
