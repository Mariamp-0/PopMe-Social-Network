import { useState } from "react";

// Defines what data the post component will receive
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
  // State to check if the user is followed
  const [isFollowing, setIsFollowing] = useState(false);

  // State to check if the post is liked
  const [liked, setLiked] = useState(false);

  // Toggles the follow/unfollow state
  const handleFollow = () => setIsFollowing(!isFollowing);

  // Toggles the like state
  const handleLike = () => setLiked(!liked);

  return (
    // Main container of the post
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
            {/* Popcorn icon */}
            <img src={popcornUrl} alt="popcorn" className="w-5 h-5" />
            <span className="text-sm text-gray-400">{rating}/5</span>
          </div>
        </div>

        {/* Like and Comment buttons */}
        <div className="flex gap-4 mt-4">
          {/* Like button */}
          <button onClick={handleLike}>
            <i
              className={`bx ${liked ? "bxs-heart" : "bx-heart"} text-[#FFC267] text-xl`}
            ></i>
          </button>

          {/* Comment button */}
          <button>
            <i className="bx bx-comment text-[#FFC267] text-xl"></i>
          </button>
        </div>
      </div>

      {/* Movie poster */}
      <div className="ml-6 w-40 h-56 rounded-lg overflow-hidden flex-shrink-0">
        <img src={poster} alt={movieTitle} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
