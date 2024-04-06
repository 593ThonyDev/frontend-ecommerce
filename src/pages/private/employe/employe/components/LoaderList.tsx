const LoaderList = () => {
    return (
        <div className="animate-pulse flex h-fit items-start justify-between cursor-pointer bg-white hover:rounded-xl rounded-xl">
            <div className="flex items-center gap-3 p-3 w-full rounded-xl">
                <div className="relative h-16 max-h-16 w-16 items-start justify-start rounded-full">
                    <div className="h-16 max-h-16 max-w-16 w-16 rounded-full bg-black-100" />
                </div>
                <div className="lg:flex lg:justify-between grid w-full">
                    <div className="grid gap-y-4 py-1">
                        <div className="bg-black-100 h-2.5 w-60 rounded-full my-auto" />
                        <div className="bg-black-100 h-2.5 w-44 rounded-full my-auto" />
                        <div className="bg-black-100 h-2.5 w-40 rounded-full my-auto" />
                        <div className="bg-black-100 h-2.5 w-52 rounded-full my-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderList