import NavBar from "@/components/landing-page/NavBar";
import Hero from "@/components/landing-page/Hero";
import Body from "@/components/landing-page/Body";

export default function Home() {
  return (
  <section className="">
    <div className="home-body w-[95%] mx-auto my-0">
      <NavBar />
      <main>
        <Hero />
        <Body />
      </main>
      <footer className="text-center">
        © ChatterBox 2024.
      </footer>
    </div>
  </section>);
}
