const LoaderList = () => {
    return (
        <div className="group sm:flex lg:rounded-xl bg-primary-50 lg:border lg:border-black-200 w-full animate-pulse">
            <div className="flex-shrink-0 relative lg:rounded-s-xl overflow-hidden w-full h-[200px] sm:w-[250px] sm:h-[350px]">
                <div className="">
                    <div className="size-full absolute top-0 start-0 object-cover bg-black-200 h-full" />
                </div>
            </div>

            <div className="grow">
                <div className="p-4 flex flex-col h-full sm:p-6">

                    <div className="h-4 bg-black-200 w-2/3 rounded-full mt-1"></div>
                    <div className="gap-y-4">
                        <div className="h-2.5 bg-black-200 w-full rounded-full  mb-3 mt-7"></div>
                        <div className="h-2.5 bg-black-200 w-full rounded-full  mb-3"></div>
                        <div className="h-2.5 bg-black-200 w-full rounded-full  mb-3"></div>
                        <div className="h-2.5 bg-black-200 w-full rounded-full  mb-3"></div>
                        <div className="h-2.5 bg-black-200 w-full rounded-full "></div>
                    </div>

                    <div className="mt-8 sm:mt-auto">
                        <div className="flex items-center">
                            <div
                                className="flex-shrink-0">
                                <div className="size-[46px] rounded-full bg-black-200 border border-primary-200" />
                            </div>
                            <div className="ms-2 w-full">
                                <div className="h-3 bg-black-200 w-full-200 w-full rounded-full  mt-1"></div>
                                <div className="h-3 bg-black-200 w-2/4 rounded-full  mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderList