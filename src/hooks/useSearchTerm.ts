import { useEffect, useRef, useState } from "react";

export function useSearchTerm(
  defaultTerm: string = "",
): [string, (term: string) => void] {
  const initialSearchTermRef = useRef<string>(defaultTerm);
  const [searchTerm, setSearchTerm] = useState(() => {
    const term = localStorage.getItem("searchTerm");
    if (term) {
      initialSearchTermRef.current = term;
      return term;
    }
    return defaultTerm;
  });

  useEffect(() => {
    initialSearchTermRef.current = searchTerm;
    return () => {
      localStorage.setItem("searchTerm", initialSearchTermRef.current);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
}
