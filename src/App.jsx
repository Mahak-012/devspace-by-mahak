import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <div id="top" className="noise relative min-h-screen bg-[#050505] text-[#f5f5f4] antialiased">
      {/* Global ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-250px] left-1/2 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[160px]" />
        <div className="absolute bottom-[-200px] left-[-200px] h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </div>
    </div>
  );
}

export default App;