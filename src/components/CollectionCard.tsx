import { useState } from "react";

interface Collection {
  id: number;
  name: string;
  creator: string;
  movieCount: number;
  likes: number;
  thumbnail: string;
  movies: string[];
}

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(collection.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-[#26242E] rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
      {/* Stack de películas */}
      <div className="relative h-80 bg-gradient-to-b from-gray-800 to-[#26242E]">
        <div className="absolute inset-0 flex items-center justify-center">
          {collection.movies.slice(0, 3).map((movie, index) => (
            <div
              key={index}
              className="absolute rounded-lg overflow-hidden shadow-xl transition-transform hover:z-10 hover:scale-110"
              style={{
                width: '180px',
                height: '260px',
                transform: `translateX(${(index - 1) * 40}px) rotate(${(index - 1) * 5}deg)`,
                zIndex: collection.movies.length - index,
              }}
            >
              <img
                src={movie}
                alt={`Movie ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
        <p className="text-sm text-gray-400 mb-3">Created by {collection.creator}</p>
        <p className="text-sm text-gray-500 mb-4">
          {collection.movieCount} movies in this collection
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button onClick={handleLike} className="flex items-center gap-2 group">
            <i className={`bx ${liked ? "bxs-heart" : "bx-heart"} text-2xl ${liked ? "text-red-500" : "text-gray-400 group-hover:text-red-500"}`}></i>
            <span className="text-sm text-gray-400">{likeCount}</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`px-4 py-2 rounded-lg transition-all ${
              saved ? "bg-[#FFC267] text-[#1B1B1F] font-semibold" : "bg-[#1B1B1F] text-gray-400 hover:bg-[#FFC267] hover:text-[#1B1B1F]"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}