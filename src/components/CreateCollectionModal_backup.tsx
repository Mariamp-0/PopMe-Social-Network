import { useState } from "react";

interface CreateCollectionModalProps {
  onClose: () => void;
}

export default function CreateCollectionModal({ onClose }: CreateCollectionModalProps) {
  const [collectionName, setCollectionName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  const handleSave = () => {
    // Aquí guardarías la colección (conectar con API o estado global)
    console.log({
      name: collectionName,
      isPrivate,
      movies: selectedMovies
    });
    onClose();
  };

  const addMoviePlaceholder = () => {
    if (selectedMovies.length < 6) {
      setSelectedMovies([...selectedMovies, `movie-${Date.now()}`]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-6">
      <div className="bg-[#26242E] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#26242E] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create a collection</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <i className="bx bx-x text-3xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Collection Name */}
          <div>
            <input
              type="text"
              placeholder="Name your collection"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              className="w-full px-4 py-3 bg-[#1B1B1F] text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#FFC267]"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPrivate(!isPrivate)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isPrivate
                  ? "bg-[#AA0235] text-white"
                  : "bg-[#1B1B1F] text-gray-400 border border-gray-700"
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${isPrivate ? "bg-[#FFC267]" : "bg-gray-600"}`}></div>
              <span className="font-semibold">Private</span>
            </button>
          </div>

          {/* Search Movie */}
          <div className="relative">
            <input
              type="text"
              placeholder="Find a movie"
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-[#1B1B1F] text-white border border-gray-700 rounded-lg focus:outline-none focus:border-[#FFC267]"
            />
            <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Add Movie Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Add a movie to the collection
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Movie placeholders */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  onClick={addMoviePlaceholder}
                  className="aspect-[2/3] bg-[#1B1B1F] rounded-lg flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition border-2 border-dashed border-gray-700 hover:border-[#FFC267]"
                >
                  {selectedMovies[index] ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#AA0235] to-[#FFC267] rounded-lg flex items-center justify-center text-white font-bold">
                      Movie {index + 1}
                    </div>
                  ) : (
                    <i className="bx bx-plus text-4xl text-[#FFC267]"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#26242E] border-t border-gray-700 px-6 py-4">
          <button
            onClick={handleSave}
            disabled={!collectionName || selectedMovies.length === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              collectionName && selectedMovies.length > 0
                ? "bg-[#FFC267] text-[#1B1B1F] hover:bg-opacity-90"
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