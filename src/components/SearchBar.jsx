import React, { useState, useEffect } from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filters = [
    "berry",
    "contest-type",
    "encounter-method",
    "evolution-chain",
    "generation",
    "item",
    "location",
    "machine",
    "move",
    "pokemon",
  ];

  return (
    <div
      className={`flex flex-col items-center gap-4 my-6 transition-all duration-300`}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pokémon..."
          className="w-64 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          🔍
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedFilter(filter)}
            className={`py-2 px-4 rounded-full ${
              selectedFilter === filter
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:scale-105 transition-transform`}
          >
            {filter.split("-").join(" ").toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
