function DisplayUsers () {
    return (
        <>
            {/* <h1>Hello, Next.js!</h1> */}
            <div className="flex flex-col gap-4 mx-20 ">

                <div className="flex flex-col space-y-4 border h-screen p-2 rounded">
                    <div className="flex border-0 justify-between ">
                        <p>All premoview users</p>
                        <button className="border rounded h-6 w-20 items-center ">
                            Create
                        </button>
                    </div>

                    <div className="flex border-0 justify-between">
                        <p>Username</p>
                        <p className="">Email</p>
                        <p className="">Actions</p>
                    </div>

                    <div className="flex border justify-between px-2 h-10 items-center rounded">
                        <p className="px-2">User</p>
                        <p className="px-2">Email</p>
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
                </div>
            </div>
        </>

    )
}
export default DisplayUsers;