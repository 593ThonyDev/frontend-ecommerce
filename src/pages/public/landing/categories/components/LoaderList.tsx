const LoaderList = () => {
    return (
        <div className="flex h-fit items-start justify-between cursor-pointer bg-white hover:rounded-xl rounded-xl w-full z-10">
            <div
                className="bg-gray-100 p-2 py-3 hover:bg-primary-100 cursor-pointer duration-500 rounded-lg  flex"
            >
                <div className="w-10 h-10 rounded-md bg-primary-50" />
                <div className="sm:text-xl my-auto ml-2 h-2 lg:w-24 w-10 bg-primary-50 "/>
            </div>
        </div>
    )
}

export default LoaderList