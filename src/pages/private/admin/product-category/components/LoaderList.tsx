const LoaderList = () => {
    return (
        <div className="flex h-fit items-start justify-between cursor-pointer bg-white hover:rounded-xl rounded-xl">
            <div className="flex items-center gap-3 p-3 w-full rounded-xl">
                <div className="relative h-16 max-h-16 w-16 items-start justify-start rounded-full">
                    <div className="h-16 max-h-16 max-w-16 w-16 rounded-xl bg-primary-100" />
                </div>
                <div className="lg:flex lg:justify-between grid w-full">
                    <div className="grid">
                        <div className="bg-black-100 h-2.5 w-32 rounded-full my-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderList