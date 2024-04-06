import React from "react"

const LoaderAbout = () => {
    return (
        <React.Fragment>
            <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 bg-primary-200">
                <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                    <svg
                        className="absolute left-0 hidden h-full text-warning-100 transform -translate-x-1/2 lg:block"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        preserveAspectRatio="none slice"
                    >
                        <path d="M50 0H100L50 100H0L50 0Z" />
                    </svg>
                    <div
                        className="object-cover w-full h-56 rounded-2xl shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full bg-black-100" />
                </div>
                <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-4 lg:max-w-screen-xl">
                    <div className="mb-16 lg:my-52 lg:max-w-lg lg:pr-5">
                        <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                            NOSOTROS
                        </h2>
                        <div className="grid pt-2 gap-y-3.5 w-full">
                            <div className="bg-black-200 h-3 px-32 lg:px-64 lg:w-full w-fit rounded-full lg:hidden" />
                            <div className="bg-black-200 h-3 px-32 lg:px-64 lg:w-full w-fit rounded-full lg:hidden" />
                            <div className="bg-black-200 h-3 px-32 lg:px-64 lg:w-full w-fit rounded-full" />
                            <div className="bg-black-200 h-3 px-32 lg:px-64 lg:w-full w-fit rounded-full" />
                            <div className="bg-black-200 h-3 px-32 lg:px-64 lg:w-full w-fit rounded-full" />
                            <div className="bg-black-200 h-3 px-32 lg:px-64 w-3/4 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20 bg-warning-50">
                <div className="container m-auto px-6 pb-8">
                    <div className="lg:flex justify-between items-center">
                        <div className="lg:w-5/12 order-1">
                            <div
                                style={{ transform: 'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)' }}
                                className="rounded-2xl bg-black-100 lg:h-80 h-64"
                            />
                        </div>
                        <div className="lg:w-6/12 lg:p-0 py-7 lg:px-7 order-2">
                            <div className="lg:w-6/12 lg:p-0 p-7">
                                <h1 className="text-3xl font-bold leading-tight mb-5 text-primary-400 uppercase">
                                    Nuestra mision
                                </h1>
                                <div className="grid py-2 gap-y-3 w-full">
                                    <div className="bg-black-200 h-3 w-full rounded-full" />
                                    <div className="bg-black-200 h-3 w-full rounded-full" />
                                    <div className="bg-black-200 h-3 w-full rounded-full" />
                                    <div className="bg-black-200 h-3 w-full rounded-full" />
                                    <div className="bg-black-200 h-3 w-full rounded-full" />
                                    <div className="bg-black-200 h-3 w-2/4 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-16 bg-success-100">
                <div className="container m-auto px-6">

                    <div className="lg:flex justify-between items-center">
                        <div className="lg:w-6/12 lg:p-0 p-7">
                            <h1 className="text-3xl font-bold leading-tight mb-5 text-warning-400 uppercase">
                                Nuestra vision
                            </h1>
                            <div className="grid pt-2 gap-y-3 w-full">
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                            <div className="bg-black-200 h-3 w-full rounded-full" />
                        </div>
                        </div>
                        <div className="lg:w-5/12 order-2">
                            <div
                                style={{ transform: 'scale(1) perspective(1040px) rotateY(11deg) rotateX(2deg) rotate(-2deg)' }}
                                className="rounded-2xl bg-black-100 lg:h-80 h-64"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoaderAbout