import React from 'react';

interface SearchBarProps {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for food..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
