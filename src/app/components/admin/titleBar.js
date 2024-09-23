import Link from "next/link";

function TitleBar() {
    return (
      <>
        <div className="flex flex-col gap-4 w-full">
          <p className="border border-white/10  rounded w-full px-3 h-10 font-semibold content-center">
           <Link href="/admin" className="">Admin pannel</Link>
          </p>
        </div>
      </>
    );
  }
  
  export default TitleBar;
  