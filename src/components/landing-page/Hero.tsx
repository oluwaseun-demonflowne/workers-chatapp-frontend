import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image'
import HeroImg from "../../app/Frame 11 (1).svg"

export default function Hero(){
    return (
        <main className="flex justify-between py-8 px-4 ">
            <div className="flex hero-text w-[50%] flex-col gap-2 justify-center">
                <h1 className="font-bold text-5xl leading-[3.25rem]">
                    Start chatting with customers, anytime, anywhere with ChatMe
                </h1>
                <p className="w-3/4 font-medium">
                    Web-based application that allows you to chat from any place at any time without any interruption.
                </p>
                <button className="flex items-center gap-4 bg-[#007aff] text-white p-3 rounded-md w-[37.5%]">Start chatting now<FaArrowRight /></button>
            </div>
            <div className="hero-img w-[50%]">
                <Image 
                    src={HeroImg}
                    
                    alt={`hero image::should be a black lady holding a smartphone `}
                />
            </div>
        </main>
    );
}