// import { motion } from "framer-motion";

export default function NavBar(){
    return (
        <header className="flex justify-between p-5 items-center">
            <h2 className="logo flex text-3xl font-bold">ChatMe</h2>
            <nav className="flex items-center gap-6">
                <ul className="flex gap-3">
                    <a href="#" className="font-semibold">About</a>
                    <a href="#" className="font-semibold">Contact</a>
                </ul>
                <div className="log flex gap-3 items-center">
                    <a href="#">Login</a>
                    <button className="bg-[#007aff] text-white p-3 rounded-md">Get Started Free</button>
                </div>
            </nav>
        </header>
    );
}