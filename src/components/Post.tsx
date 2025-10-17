import { useState } from "react";

interface PostProps {
  username: string;
  handle: string;
  movieTitle: string;
  year: number;
  review: string;
  rating: number;
  poster: string;
  popcornUrl: string;
}

export default function Post({
  username,
  handle,
  movieTitle,
  year,
  review,
  rating,
  poster,
  popcornUrl,
}: PostProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleLike = () => setLiked(!liked);

  return (
    <div className="flex bg-[#26242E] rounded-2xl p-4 mb-6 shadow-md w-full max-w-3xl mx-auto items-center text-white">
      <div className="flex flex-col flex-1">
        {/* User info */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="font-semibold text-lg">{username}</h2>
            <p className="text-sm text-gray-400">{handle}</p>
          </div>

          {/* Follow button */}
          <button
            onClick={handleFollow}
            className="bg-[#AA0235] text-white px-4 py-1 rounded-full text-sm hover:opacity-90 transition"
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* Movie info */}
        <div>
          <h3 className="text-xl font-semibold mb-1">
            {movieTitle} ({year})
          </h3>
          <p className="text-gray-300 text-sm mb-2">{review}</p>
          <div className="flex items-center gap-2">
            <img src={popcornUrl} alt="popcorn" className="w-5 h-5" />
            <span className="text-sm text-gray-400">{rating}/5</span>
          </div>
        </div>

        {/* Like and Comment buttons */}
        <div className="flex gap-4 mt-4">
          <button onClick={handleLike}>
            <i
              className={`bx ${
                liked ? "bxs-heart" : "bx-heart"
              } text-[#FFC267] text-xl`}
            ></i>
          </button>
          <button>
            <i className="bx bx-comment text-[#FFC267] text-xl"></i>
          </button>
        </div>
      </div>

      {/* Movie poster*/}
      <div className="ml-6 w-40 h-56 rounded-lg overflow-hidden flex-shrink-0">
        <img src={poster} alt={movieTitle} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
