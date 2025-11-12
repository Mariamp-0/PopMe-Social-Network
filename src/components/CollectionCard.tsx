import { useState } from "react";

type Collection = {
  id: number;
  title: string;
  author: string;
  description?: string;
  moviesCount: number;
  likes: number;
  movies: string[];
};

type Props = {
  collection: Collection;
  onLike: () => void;
  onImageClick: () => void;
  isSaved?: boolean;
  onSave?: () => void;
};

export default function CollectionCard({ 
  collection, 
  onLike, 
  onImageClick,
  isSaved = false,
  onSave 
}: Props) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      onLike();
    }
    setLiked(!liked);
  };

  const handleSaveClick = () => {
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="bg-[#26242E] rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 shadow-xl">
      {/* Stack de películas */}
      <div 
        className="relative h-80 cursor-pointer"
        style={{
          background: 'linear-gradient(to bottom, rgb(31, 41, 55), #26242E)'
        }}
        onClick={onImageClick}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {collection.movies.slice(0, 3).map((movie, index) => (
            <div
              key={index}
              className="absolute rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:z-30 hover:scale-110"
              style={{
                width: '180px',
                height: '260px',
                transform: `translateX(${(index - 1) * 45}px) rotate(${(index - 1) * 6}deg)`,
                zIndex: 10 + index,
              }}
            >
              <img
                src={movie}
                alt={`Movie ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-white border-opacity-10 rounded-xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1 text-white">{collection.title}</h3>
        <p className="text-sm text-gray-400 mb-1">Created by {collection.author}</p>
        <p className="text-xs text-gray-500 mb-4">
          {collection.moviesCount} movies in this collection
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <button
            onClick={handleLikeClick}
            className="flex items-center gap-2 group transition-all"
          >
            <i
              className={`bx text-2xl transition-all ${
                liked 
                  ? "bxs-heart text-[#FFC267] scale-110" 
                  : "bx-heart text-gray-400 group-hover:text-[#FFC267]"
              }`}
            ></i>
            <span className={`text-sm font-medium ${liked ? "text-[#FFC267]" : "text-gray-400"}`}>
              {collection.likes}
            </span>
          </button>

          <button
            onClick={handleSaveClick}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isSaved
                ? "bg-[#FFC267] text-[#1B1B1F] shadow-lg"
                : "bg-[#1B1B1F] text-gray-400 hover:bg-[#FFC267] hover:text-[#1B1B1F] border border-gray-700"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}