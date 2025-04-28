import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center h-40  bg-gray-100">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>
      <Cards searchQuery={searchQuery} selectedFilter={selectedFilter} />
    </>
  );
};

export default Home;
