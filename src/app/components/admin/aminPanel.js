function DisplayMovies() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <p className="border border-white/10  rounded w-full px-3 h-10 font-semibold content-center">
          Admin pannel
        </p>

        <div className="w-full h-20 border border-white/10  rounded ">
          <div className="flex border-b justify-end gap-3 m-4 border-white/10">
            <button className="">Users</button>
            <button className="">Movies</button>
            <button className="">Statistic</button>
          </div>
        </div>

        {/* 

                <div className="flex flex-col space-y-4 border h-screen p-2 rounded">
                    <div className="flex border-0 justify-between ">
                        <p>All premoview's movies</p>
                        <button className="border rounded h-6 w-20 items-center ">
                            Create
                        </button>
                    </div>

                    <div className="flex border-0 justify-between">
                        <p>Title</p>
                        <p className="">Actions</p>
                    </div>

                    <div className="flex border justify-between px-2 h-10 items-center rounded">
                        <p className="px-2">Movie title </p>
                        <div className="flex space-x-2">
                            <button className="border rounded h-6 w-20 text-sm">
                                Details
                            </button>
                            <button className="border rounded h-6 w-20 text-sm">
                                Update
                            </button>
                            <button className="border rounded h-6 w-20 text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div> */}
      </div>
    </>
  );
}

export default DisplayMovies;
