import { useState } from "react";
import type { ChangeEvent } from "react"; // Importamos ChangeEvent solo como tipo

interface SearchBarProps {
  onSearch: (term: string) => void; // función que recibe el texto del input
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // envía el valor al componente padre (App.tsx)
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}
