import ImgNotFound from "../../assets/NotFound.png";
import { Link } from 'react-router-dom';
import { PATH_ADMIN_HOME } from '../../routes/private/admin/PrivatePaths';

const NotfoundAdminDefault = () => {
    return (
        <div className="flex h-full w-full justify-center bg-primary-50 text-center my-auto">
            <div className=" mx-auto">
                <div className='relative -bottom-16 uppercase'>
                    <span className=' text-5xl font-bold text-primary-500'>
                        ERROR
                    </span>
                </div>
                <div className='relative -bottom-16 uppercase font-bold text-primary-400'>
                    <span className="text-5xl">
                        404
                    </span>
                </div>
                <img src={ImgNotFound} className="w-96 mx-auto" alt="" />
                <div className="relative -top-12">
                    <span className="text-black-500 text-center text-lg -top-10">
                        <div className="grid">
                            <span>Página no encontrada, </span>
                            <span>puede que se haya esfumado en el ciberespacio</span>
                        </div>

                    </span>
                </div>

                <div className='mb-6 relative -top-5'>
                    <Link to={PATH_ADMIN_HOME} className=' bg-primary-600/70 text-primary-100 px-3 py-2 rounded-xl '>
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotfoundAdminDefault