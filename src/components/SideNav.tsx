import { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaHome, FaList } from 'react-icons/fa'; // Importing icons

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`bg-[#F9F9F9] transition-all duration-300 ease-in-out z-10 flex flex-col items-center ${isOpen ? 'w-56' : 'w-16'}`}>
            <img src='/assets/logo.svg' width={100} className='my-5 px-2 ' />
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-white shadow-md rounded-md self-end relative -right-5">
                {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </button>
            <nav className="flex flex-col space-y-6 p-5">
                <a href="#" className="flex items-center gap-x-2 font-semibold">
                    <FaHome /> {isOpen && "Dashboard"}
                </a>
                <a href="#" className="flex items-center gap-x-2 font-semibold">
                    <FaList /> {isOpen && "Table Preview"}
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
