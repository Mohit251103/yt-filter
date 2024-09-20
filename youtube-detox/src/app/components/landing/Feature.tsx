export const Feature = () => {

    return (
        <div className="my-12">
            <div className="flex justify-center relative">
                <img src="pc_landing.png" alt="" className="h-[60vh] w-[80%] shadow-sm shadow-slate-200 rounded-md max-sm:hidden max-xl:w-[85%] max-xl:h-[52vh]" />
                <img src="mobile_landing.png" alt="" className="h-[55vh] max-md:h-[50vh] sm:absolute shadow-sm shadow-slate-200 rounded-md right-2 top-6 max-xl:h-[40vh] max-xl:top-[8.5rem]" />
            </div>
        </div>
    )

}