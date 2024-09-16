import contactImg from "../../app/assets/chat-chat-svgrepo-com.svg"
import aboutImg from "../../app/assets/telephone-call-call-svgrepo-com.svg"
import Image from "next/image";

export default function Body(){
    return (
        <div>

            <div id="about" className="flex items-center">
                <div className="about-img w-[47.5%]">
                    <Image src={aboutImg} alt="" className="w-full h-[47.5svh]"/>
                </div>
                <div className="about-text w-[45%]">
                    <h3 className="text-3xl font-bold">About</h3>
                    <p>
                        Connect and Chat in Real-Time! ChatterBox is your go-to app for quick, 
                        fun talks with friends, family, or anyone you like. {`It's`} 
                        super easy to use and works right away. Send messages and share cool stuff 
                        in seconds. No fuss, no wait - just start ChatterBox and start chatting. {`It's`} safe(probably), 
                        fast, and perfect for keeping up with your crew. Ready to make
                        your chats more fun? Dive into ChatterBox today!
                    </p>
                </div>
            </div>

            <div id="contact" className="flex items-center">
                <div className="contact-text w-[45%]">
                    <h3 className="text-3xl font-bold">Contact</h3>
                    <p>
                        ffff
                    </p>
                </div>
                <div className="contact-img w-[47.5%]">
                    <Image src={contactImg} alt=""  className="w-full h-[47.5svh]"/>
                </div>
            </div>

        </div>
    );
}