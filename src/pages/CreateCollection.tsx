import { useState } from "react";

interface CreateCollectionProps {
  onBack: () => void;
}

export default function CreateCollection({ onBack }: CreateCollectionProps) {
  const [collectionName, setCollectionName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);

  const handleAddMovie = (index: number) => {
    if (selectedMovies.includes(index)) {
      setSelectedMovies(selectedMovies.filter(i => i !== index));
    } else if (selectedMovies.length < 6) {
      setSelectedMovies([...selectedMovies, index]);
    }
  };

  const handleSave = () => {
    if (collectionName && selectedMovies.length > 0) {
      alert(`✨ Collection "${collectionName}" created with ${selectedMovies.length} movies!`);
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
      <div className="bg-[#26242E] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-white">Create a collection</h2>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition text-3xl"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Name input */}
          <input
            type="text"
            placeholder="Name your collection"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="w-full px-5 py-3 bg-[#1B1B1F] text-white border border-gray-700 rounded-xl focus:outline-none focus:border-[#FFC267] transition"
          />

          {/* Private toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPrivate(!isPrivate)}
              className={`flex items-center gap-3 px-5 py-2 rounded-full transition-all ${
                isPrivate
                  ? "bg-[#AA0235] text-white"
                  : "bg-[#1B1B1F] text-gray-400 border-2 border-gray-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-all ${
                  isPrivate ? "bg-[#FFC267]" : "bg-gray-600"
                }`}
              ></div>
              <span className="font-semibold">Private</span>
            </button>
          </div>

          {/* Search movie */}
          <div className="relative">
            <input
              type="text"
              placeholder="Find a movie"
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full px-5 py-3 pl-12 bg-[#1B1B1F] text-white border border-gray-700 rounded-xl focus:outline-none focus:border-[#FFC267] transition"
            />
            <i className="bx bx-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>

          {/* Add movies section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add a movie to the collection
            </h3>

            <div className="grid grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleAddMovie(index)}
                  className="rounded-xl flex items-center justify-center cursor-pointer transition-all border-2 border-dashed"
                  style={{
                    aspectRatio: '2/3',
                    background: selectedMovies.includes(index)
                      ? 'linear-gradient(to bottom right, #AA0235, #FFC267)'
                      : '#1B1B1F',
                    borderColor: selectedMovies.includes(index) ? '#FFC267' : '#4B5563'
                  }}
                >
                  {selectedMovies.includes(index) ? (
                    <div className="text-white text-center">
                      <i className="bx bx-check text-5xl"></i>
                      <p className="text-sm mt-2">Movie {index + 1}</p>
                    </div>
                  ) : (
                    <i className="bx bx-plus text-5xl text-[#FFC267]"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-700">
          <button
            onClick={handleSave}
            disabled={!collectionName || selectedMovies.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              collectionName && selectedMovies.length > 0
                ? "bg-[#FFC267] text-[#1B1B1F] hover:bg-opacity-90 shadow-lg"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}