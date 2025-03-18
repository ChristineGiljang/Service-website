import { Link } from "react-router-dom";
import heroBg from "../../assets/hero-bg.png";
import Button from "../../components/ui/Button"

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Discover Top Services Today or Earn by Offering Yours!
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Join a trusted marketplace for local services.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="special"
            label="Sign Up as a Client"
            to="/signup-worker"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
