const LoaderHome = () => {
    return (
        <div className="animate-pulse  bg-white flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto flex relative py-4  flex-col-reverse sm:flex-row">
                <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20 lg:pt-4 lg:pl-6 px-3">
                    <span className="w-28 h-2 bg-warning-500 mb-4" />
                    <div className="grid gap-y-4 pl-1">
                        <div className="bg-black-200 md:h-16 lg:h-16 h-10 w-3/4  lg:w-72" />
                        <div className="bg-black-200 md:h-16 lg:h-16 h-6  w-1/2 lg:w-56" />
                        <div className="bg-black-200 md:h-16 lg:block hidden lg:h-16 h-6  w-1/2 lg:w-72" />
                    </div>
                    <div className="flex w-full pt-5">
                        <div className="grid pt-2 gap-y-3 w-full">
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-3/4 rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/3 lg:w-3/5 relative  -mt-2 lg:py-7">
                    <div className="flex items-center justify-center lg:py-2 md:py-0 py-8">
                        <div className="object-cover object-center flex items-center justify-center bg-black-300/50 h-80 w-80 lg:h-96 lg:w-96 rounded-full backdrop-blur-3xl">
                            <svg className="w-24 text-black-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderHome