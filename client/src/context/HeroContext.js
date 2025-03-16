import { createContext, useContext, useState } from "react";

const HeroContext = createContext();
export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  const [activeHero, setActiveHero] = useState("default");

  return (
    <HeroContext.Provider value={{ activeHero, setActiveHero }}>
      {children}
    </HeroContext.Provider>
  );
  
};
