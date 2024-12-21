import { Menu, X } from 'lucide-react';


const AdminHeader = ({toggleSidebar, isOpen}) => {
    return (
        <header className="flex shadow-md py-1 px-4 sm:px-7 bg-white min-h-[70px] tracking-wide z-[110] fixed top-0 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full relative">
                <div>
                    <h1 className="text-3xl font-semibold">UMS</h1>
                </div>
                <button id="toggleOpen" className="absolute top-6 right-0 !ml-7 outline-none" onClick={toggleSidebar}>
                    { isOpen ?  <Menu /> : <X />}
                </button>
            </div>
        </header>
    )
}

export default AdminHeader