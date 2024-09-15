export default function NavBar(){
    return (
        <header className="flex justify-between p-5 items-center">
            <h2 className="logo flex text-3xl font-bold">ChatMe</h2>
            <nav className="flex gap-3 items-center">
                <a href="#" className="font-semibold">Demos</a>
                <a href="#" className="font-semibold">About</a>
                <a href="#" className="font-semibold">Blog</a>
                <a href="#" className="font-semibold">Pages</a>
                <a href="#" className="font-semibold">Contact</a>
            </nav>
            <div className="log flex gap-3 items-center">
                <a href="#">Login</a>
                <button className="bg-[#007aff] text-white p-3 rounded-md">Get Started Free</button>
            </div>
        </header>
    );
}