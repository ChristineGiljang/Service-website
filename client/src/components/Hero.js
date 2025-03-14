import { useHero } from "../context/HeroContext";

const Hero = () => {
  const { activeHero } = useHero(); // ✅ Use context
  const title =
    activeHero === "default"
      ? "Find the best services near you, anytime, anywhere!"
      : activeHero === "find"
      ? "Discover top-rated services tailored to your needs!"
      : "Offer your expertise and connect with clients!";

  return (
    <div className="hero">
      <h1>{title}</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder={
            activeHero === "default"
              ? "Search for any service..."
              : activeHero === "find"
              ? "Search for a service..."
              : "Search for jobs..."
          }
        />
        <button>{activeHero === "provide" ? "List Service" : "Search"}</button>
      </div>
    </div>
  );
};

export default Hero;
