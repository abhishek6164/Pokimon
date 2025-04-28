import React, { useEffect, useState } from "react";

const Cards = ({ searchQuery, selectedFilter }) => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Store selected card's details

  // Fetch Data Based on Filter
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = selectedFilter
          ? `https://pokeapi.co/api/v2/${selectedFilter}`
          : `https://pokeapi.co/api/v2/pokemon?limit=150`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.results) {
          setCardsData(data.results);
        } else {
          setCardsData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCardsData([]);
        setError("Failed to load Pokémon data. Please try again later.");
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedFilter]);

  // Search ke hisaab se filter karna
  const filteredCards = cardsData.filter((card) =>
    card.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Card Click
  const handleCardClick = async (cardName) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${cardName}`
      );
      const data = await response.json();
      setSelectedCard(data); // Set the details of the clicked card
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };

  return (
    <div>
      <div className="grid m-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-4 text-center text-gray-500">Loading...</p>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => handleCardClick(card.name)} // Handle card click
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={card.name}
                className="w-full h-48 object-contain bg-gray-100"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                  {card.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No Pokémon found!
          </p>
        )}
      </div>

      {/* Display selected card details */}
      {selectedCard && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800">
              {selectedCard.name}
            </h2>
            <div className="mt-4">
              <img
                src={selectedCard.sprites.front_default}
                alt={selectedCard.name}
                className="w-32 h-32 mx-auto"
              />
              <p className="mt-2">Height: {selectedCard.height}</p>
              <p>Weight: {selectedCard.weight}</p>
              <p>Base Experience: {selectedCard.base_experience}</p>
            </div>
            <button
              onClick={() => setSelectedCard(null)} // Close the details view
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
