import { PATH_HOME, PATH_LOGIN } from "../../../routes/public/Paths";
import InputField from "../../../components/fields/InputField";
import Footer from "../../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../../assets/auth.png";
import React, { FormEvent } from "react";
import TextArea from "../../../components/fields/TextArea";
import { signIn } from "./model/RegisterApi";
import { RegisterModel } from "./model/RegisterModel";
import toast from "react-hot-toast";
import imgLogo from "../../../assets/LogoIcono.png"

const Register = () => {

    const navigate = useNavigate();

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Validación de campos vacíos
        const fieldsToValidate = ["nombres", "apellidos", "email", "telefono", "pais", "codigoPostal", "direccion"];
        const emptyFields = fieldsToValidate.filter(field => !formData.get(field));
        if (emptyFields.length > 0) {
            toast.error(`Los campos ${emptyFields.join(', ')} son obligatorios`);
            return;
        }

        // Crear objeto de usuario
        const customerUser: RegisterModel = {
            name: formData.get('nombres') as string,
            lastName: formData.get('apellidos') as string,
            email: formData.get('email') as string,
            phone: formData.get('telefono') as string,
            country: formData.get('pais') as string,
            zip: formData.get('codigoPostal') as string,
            address: formData.get('direccion') as string
        };

        try {
            const success = await signIn(customerUser);
            if (success) {
                navigate(PATH_LOGIN);
            }
        } catch (error) {
            console.error("Error en realizar tu petición:", error);
        }
    };


    return (
        <React.Fragment>
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
                                <div className=" my-12 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                                    <div className="mt-[2vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                                        <h4 className="mb-5 mt-0 text-4xl text-center font-bold text-primary-400 uppercase">
                                            Registrate
                                        </h4>
                                        <form onSubmit={handleRegister} autoComplete="false" className="w-full">
                                            <div className="grid">
                                                <div className="grid lg:grid-cols-2 gap-x-3">
                                                    <InputField
                                                        mode="text"
                                                        label="Nombres:"
                                                        id="nombres"
                                                    />
                                                    <InputField
                                                        mode="text"
                                                        label="Apellidos:"
                                                        id="apellidos"
                                                    />
                                                    <InputField
                                                        mode="email"
                                                        label="Email:"
                                                        id="email"
                                                    />
                                                    <InputField
                                                        mode="tel"
                                                        label="Telefono:"
                                                        id="telefono"
                                                    />
                                                    <InputField
                                                        mode="text"
                                                        label="Pais:"
                                                        id="pais"
                                                    />
                                                    <InputField
                                                        mode="numeric"
                                                        label="Codigo postal:"
                                                        id="codigoPostal"
                                                    />
                                                </div>
                                                <div className="">
                                                    <TextArea label="Direccion de residencia:"
                                                        placeholder={""}
                                                        rows={0}
                                                        id="direccion"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-center text-center">
                                                <button type="submit" className="w-full uppercase py-2 mt-7 px-4 rounded-xl bg-primary-400 border-transparent text-white text-md hover:bg-primary-500 font-bold">
                                                    Registrarme
                                                </button>
                                            </div>
                                        </form>
                                        <div className="mt-4  flex items-center justify-center px-2 pb-5">
                                            <Link to={PATH_LOGIN} className="text-black-300 hover:text-black-400">
                                                ¿Tienes una cuenta? <span className=" font-bold"> Inicia sesion</span>
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
            
        </React.Fragment>
    );
};

export default Register;
