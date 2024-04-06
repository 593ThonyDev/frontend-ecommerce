import CompanyList from "./CompanyList"

const Company = () => {
    return (
        <section className="flex bg-stone-100 font-poppins dark:bg-gray-800 lg:pt-12">
            <div className="justify-center flex-1 max-w-6xl py-4 mx-auto md:px-6">
                <CompanyList />
            </div>
        </section>
    )
}

export default Company