function  DisplayStatistic () {
    return (
        <>
        <div className="flex flex-col gap-4 mx-20 ">
                <p className="w-full border px-3 h-10 font-semibold content-center rounded ">
                    Admin pannel
                </p>

                <div className="w-full border h-20  rounded">
                    <div className="flex border-b justify-end gap-3 m-4 ">
                        <button className="">Users</button>
                        <button className="">Movies</button>
                        <button className="">Statistic</button>
                    </div>
                
                </div>
            </div>

            <div className="flex border justify-between px-2 h-10 items-center rounded">
            </div>
        </>
    )
}