'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

function NavBar() {
  const pathname = usePathname()
  console.log(pathname);
  const style1 = pathname.includes('users') ? 'border-x border-t border-white/10 rounded-t-lg px-2' : ''
  const style2 = pathname.includes('movies') ? 'border-x border-t border-white/10 rounded-t-lg px-2' : ''
  const style3 = pathname.includes('statistics') ? 'border-x border-t border-white/10 rounded-t-lg px-2' : ''
  
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full h-20 border border-white/10  rounded ">
          <div className="flex border-b justify-end gap-3 m-4 border-white/10 text-sm">
            <Link href="/admin/users" className={`${style1}`}>Users</Link>
            <Link href="/admin/movies" className={`${style2}`}>Movies</Link>
            <Link href="/admin/statistics" className={`${style3}`}>Statistics</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
