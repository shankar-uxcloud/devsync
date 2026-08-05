import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </>
  );
}

export default LandingPage;