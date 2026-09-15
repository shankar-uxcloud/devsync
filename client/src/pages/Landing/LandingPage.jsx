import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import DashboardPreview from "./components/DashboardPreview";
import KanbanPreview from "./components/KanbanPreview";
import FeaturesSection from "./components/FeaturesSection";
import AIFeatureSection from "./components/AIFeatureSection";
import GithubSection from "./components/GithubSection";
import TeamSection from "./components/TeamSection";
import FinalCTA from "./components/FinalCTA";
import LandingFooter from "./components/LandingFooter";

function LandingPage() {
  return (
    <div style={{ background: "var(--ds-bg)" }}>
      <LandingNavbar />
      <HeroSection />
      <DashboardPreview />
      <KanbanPreview />
      <FeaturesSection />
      <AIFeatureSection />
      <GithubSection />
      <TeamSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}

export default LandingPage;