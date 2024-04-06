import { PATH_HOME, PATH_REGISTER, PATH_RESTORE_PASSWORD } from "../../../routes/public/Paths";
import InputField from "../../../components/fields/InputField";
import { AuthByUsernamePassword } from "./model/AuthApi";
import Footer from "../../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../../assets/auth.png";
import toast from "react-hot-toast";
import React, { FormEvent, useEffect, useState } from "react";
import { processToken } from "../../../functions/AuthApi";
import imgLogo from "../../../assets/LogoIcono.png"

const Login = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        processToken(setIsLoading, navigate);
    }, [navigate]);


    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            await AuthByUsernamePassword({ username, password }, navigate);
        } catch (error) {
            toast.error("Error en realizar tu peticion")
        }

    }

    return (
        <React.Fragment>
            {isLoading ? null :
                <main className={`mx-auto`}>
                    <div className="relative flex">
                        <div className="mx-auto flex min-h-full w-full flex-col justify-start md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
                            <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                                <Link to={PATH_HOME} className="uppercase text-black-500 ml-1 mt-4 flex">
                                    <span className="my-auto mr-1">
                                        <img
                                            className="h-8 w-auto"
                                            src={imgLogo}
                                            alt=""
                                        />
                                    </span>
                                    <div className="flex flex-col">
                                        <small className=" text-xs lg:text-sm text-black-600">Fundacion</small>
                                        <small className=" text-xs lg:text-sm text-black-600">Gotitas del Rocio</small>
                                    </div>
                                </Link>
                                <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                                    <div className="mt-[2vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                                        <h4 className="mb-14 mt-0 text-4xl text-center font-bold text-primary-400 ">
                                            INICIAR SESION
                                        </h4>
                                        <form onSubmit={handleLogin} autoComplete="false" className="w-full">
                                            <InputField
                                                mode='email'
                                                variant="auth"
                                                extra="mb-3 pt-6"
                                                label="Usuario*"
                                                placeholder="Ingrese su usuario o cedula"
                                                id="username"
                                                type="text"
                                            />
                                            <InputField
                                                mode='text'
                                                extra="mb-3"
                                                label="Contraseña*"
                                                placeholder="Ingrese su contraseña"
                                                id="password"
                                                type="password"
                                            />
                                            <div className="w-full flex justify-center text-center">
                                                <button type="submit" className="w-full uppercase py-2 mt-7 px-4 rounded-xl bg-primary-400 border-transparent text-white text-md hover:bg-primary-500 font-bold">
                                                    Ingresar
                                                </button>
                                            </div>
                                        </form>
                                        <div className="mt-20 lg:mt-4 flex items-center justify-center px-2 pt-6 pb-5">
                                            <Link to={PATH_REGISTER} className="text-primary-300 hover:text-primary-400">
                                                ¿No tienes una cuenta? <span className=" font-bold"> Registrate</span>
                                            </Link>
                                        </div>
                                        <div className=" flex items-center justify-center px-2 ">
                                            <Link to={PATH_RESTORE_PASSWORD} className="text-black-300 hover:text-black-400">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[45vw] 2xl:w-[55vw]">
                                    <div className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]" style={{ backgroundImage: `url(${AuthImg})` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            }

        </React.Fragment>

    );
};

export default Login;
