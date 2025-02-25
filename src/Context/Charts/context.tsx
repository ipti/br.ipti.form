import { createContext } from "react";
import { CreateChartsContext } from "./state";

export type ChartsProps = {
  dates: Date[];
  ts: number[];
};

const ChartsContext = createContext<ChartsProps | null>(null);

const ChartsProvider = ({ children }: { children: React.ReactNode }) => {
  const { dates, ts } = CreateChartsContext();

  return (
    <ChartsContext.Provider value={{ dates, ts }}>
      {children}
    </ChartsContext.Provider>
  );
};

export { ChartsContext };
export default ChartsProvider;
