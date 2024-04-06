const LoaderList = () => {
    return (
        <div className="relative animate-pulse flex w-full max-w-xs flex-col overflow-hidden rounded-2xl bg-white border border-primary-100">
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-2xl justify-center bg-black-200">
                <div className="object-cover backdrop-blur-md" />
                <span className={`absolute top-0 right-0 m-2 rounded-full backdrop-blur-md px-2 text-center text-lg text-white bg-black-100/65 uppercase`}>
                    {"Estado"}
                </span>
            </div>
            <div className="mt-1 px-5 pb-5">
                <div>
                    <div className="text-xl tracking-tight bg-black-200 rounded-full mt-2 py-2 w-32 font-semibold line-clamp-1" />
                </div>
                <h5 className="flex justify-between text-md tracking-tight text-center text-primary-500 pt-2">
                    <div className="text-black-600 font-semibold">Categoria:</div>
                    <div className="bg-black-200 h-2.5 w-16 rounded-full my-auto" />
                </h5>
                <h5 className="flex justify-between text-md tracking-tight text-center text-primary-500">
                    <div className="text-black-600 font-semibold">Stock:</div>
                    <div className="bg-black-200 h-2.5 w-20 rounded-full my-auto" />
                </h5>
                <h5 className="flex justify-between text-md tracking-tight text-center text-primary-500">
                    <div className="text-black-600 font-semibold">Valor:</div>
                    <div className="bg-black-200 h-2.5 w-16 rounded-full my-auto" />
                </h5>
            </div>
        </div>
    )
}

export default LoaderList