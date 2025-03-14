import { useHero } from "../context/HeroContext";
import Header from './Header';
import Hero from './Hero'
import "../css/hero.css";

function HeroContainer() {
  const { activeHero } = useHero(); 

  return (
    <div>
      <Header />
      <Hero 
        title={
          activeHero === "default" 
            ? "Find the best services near you, anytime, anywhere!" 
            : activeHero === "find" 
            ? "Discover top-rated services tailored to your needs!" 
            : "Offer your expertise and connect with clients!"
        } 
        activeHero={activeHero}
      />
    </div>
  );
};

export default HeroContainer;
