function CreateMovie() {
    return (
        <form className='w-full' onSubmit={addPost}>
        <span className='font-bold py-2 block underline text-2xl'>Form Add</span>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Title</label>
             <input type='text' name='title' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  />
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Content</label>
             <textarea name='title' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  />
        </div>
        <div className='w-full py-2'>
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
        </div>
    </form>
    )
}