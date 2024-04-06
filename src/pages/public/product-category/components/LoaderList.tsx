const LoaderList = () => {
    return (
        <div className="flex h-fit items-start justify-between cursor-pointer bg-primary-100 hover:rounded-xl rounded-xl">
            <div className="flex items-center gap-3 p-1 w-full rounded-xl">
                <div className="relative h-10 max-h-10 w-10 items-start justify-start rounded-full">
                    <div className="h-10 max-h-10 max-w-10 w-10 rounded-xl bg-black-200" />
                </div>
                <div className="lg:flex lg:justify-between grid w-full">
                    <div className="grid">
                        <div className="bg-black-200 h-2.5 lg:w-32 w-16 rounded-full my-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderList