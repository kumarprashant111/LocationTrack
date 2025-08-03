"use client";

import { createContext, useContext, useState } from "react";

type Filters = {
  region: string;
  category: string;
  startDate: string;
  endDate: string;
};

const defaultFilters: Filters = {
  region: "all",
  category: "all",
  startDate: "",
  endDate: "",
};

// 🔁 UPDATE this type to accept the updater function
type FilterContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
