import { BiCamera } from "react-icons/bi"
import SytyleBackgroundView from "./SytyleBackgroundView"

const LoaderView = () => {
    return (
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto md:px-6 lg:pt-16 pt-10 animate-pulse">
            <div className="flex flex-wrap">
                <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                    <div className="relative">
                        <div className="flex items-center justify-center">
                            <div className="object-cover object-center flex items-center justify-center bg-black-300/50 h-80 w-80 lg:h-96 lg:w-96 rounded-full backdrop-blur-3xl">
                                <svg className="w-24 text-black-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                            </div>
                            <div className="absolute lg:top-80 bottom-4 z-40 lg:right-28 sm:right-60 lg:py-4 rounded-full right-10 p-4  cursor-pointer bg-primary-500/40 hover:bg-primary-600/40 backdrop-blur-lg text-white">
                                <BiCamera className='my-auto' />
                            </div>
                        </div>
                    </div>
                    <SytyleBackgroundView />
                </div>
                <div className="w-full px-4 mb-10 md:w-1/2 lg:mb-0 ">
                    <div className="flex justify-between">
                        <div className="grid">
                            <div className="h-5 bg-black-300/60 rounded-full w-80 my-3 mt-4 mb-3"></div>
                            <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded">
                                <div className="flex-1 h-2 bg-primary-200">
                                </div>
                                <div className="flex-1 h-2 bg-primary-400">
                                </div>
                                <div className="flex-1 h-2 bg-primary-300">
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="grid lg:grid-cols-2">
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                            <div className="grid">
                                <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                                <div className="h-2 bg-black-200 rounded-full w-32 my-2"></div>
                            </div>
                        </li>
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                            <div className="grid">
                                <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                                <div className="h-2 bg-black-200 rounded-full w-32 my-2"></div>
                            </div>
                        </li>
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                            <div className="grid">
                                <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                                <div className="h-2 bg-black-200 rounded-full w-32 my-2"></div>
                            </div>
                        </li>
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                            <div className="grid">
                                <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                                <div className="h-2 bg-black-200 rounded-full w-32 my-2"></div>
                            </div>
                        </li>
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                            <div className="grid">
                                <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                                <div className="h-2 bg-black-200 rounded-full w-32 my-2"></div>
                            </div>
                        </li>
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                            <div className="grid">
                                <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                                <div className="h-2 bg-black-200 rounded-full w-32 my-2"></div>
                            </div>
                        </li>

                    </ul>
                    <li className="flex mb-4 text-base text-black-800">
                        <span className="mr-3 bg-primary-500 p-2.5 h-1 rounded-full" />
                        <div className="grid">
                            <div className="h-3 bg-black-200 rounded-full w-16 mt-1 mb-3"></div>
                            <div className="h-2 bg-black-200 rounded-full w-64 lg:w-96 my-2"></div>
                            <div className="h-2 bg-black-200 rounded-full w-64 lg:w-96 my-2"></div>
                            <div className="h-2 bg-black-200 rounded-full w-64 lg:w-96 my-2"></div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default LoaderView