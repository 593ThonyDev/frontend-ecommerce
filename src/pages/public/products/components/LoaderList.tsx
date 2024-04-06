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
                <div className="flex justify-center py-3">
                    <div className="text-xl tracking-tight bg-black-200 rounded-full mt-1.5 py-2 w-32 font-semibold line-clamp-1 mx-a" />
                </div>
                <div className="flex justify-center w-full text-md tracking-tight text-center text-primary-500">
                    <div className="bg-black-200 py-5 w-full rounded-xl my-auto" />
                </div>
            </div>
        </div>
    )
}

export default LoaderList