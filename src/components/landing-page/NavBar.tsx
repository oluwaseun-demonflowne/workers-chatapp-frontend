// import { motion } from "framer-motion";
import Link from 'next/link'

export default function NavBar(){
    return (
        <header className="flex justify-between p-5 items-center">
            <h2 className="logo flex text-3xl font-bold">ChatterBox</h2>
            <nav className="flex items-center gap-6">
                <ul className="flex gap-3">
                    <a href="#about" className="font-semibold">About</a>
                    <a href="#contact" className="font-semibold">Contact</a>
                </ul>
                <Link href="/login" className='flex gap-3 items-center'>
                    <button className="bg-[#007aff] text-white p-3 rounded-md hover:bg-blue-600">Get Started Free</button>
                </Link>
            </nav>
        </header>
    );
}