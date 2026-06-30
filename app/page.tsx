import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { GitHubFootprint } from "@/components/GitHubFootprint";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <Hero />
      <Projects />
      <TechStack />
      <GitHubFootprint />
      <Footer />
    </main>
  );
}
