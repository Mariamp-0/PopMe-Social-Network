import { useState } from "react";
import { likePost, unlikePost } from "../services/api";

interface PostProps {
  id: number;
  username: string;
  handle: string;
  movieTitle: string;
  year: number;
  review: string;
  rating: number;
  poster: string;
  popcornUrl: string;
  initialLikes: number;
  initialComments?: number;
}

export default function Post({
  id,
  username,
  handle,
  movieTitle,
  year,
  review,
  rating,
  poster,
  initialLikes,
  initialComments = 0
}: PostProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    try {
      if (newLikedState) {
        const result = await likePost(id, likeCount);
        setLikeCount(result.likes);
      } else {
        const result = await unlikePost(id, likeCount);
        setLikeCount(result.likes);
      }
    } catch (error) {
      console.error('Error updating like:', error);
      // Revertir en caso de error
      setLiked(!newLikedState);
    } finally {
      setIsLiking(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bx ${i < rating ? "bxs-star" : "bx-star"} text-[#FFC267]`}
      ></i>
    ));
  };

  return (
    <div className="bg-[#26242E] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#AA0235] to-[#FFC267] p-0.5">
                <div className="w-full h-full rounded-full bg-[#26242E] flex items-center justify-center">
                  <span className="text-xl font-bold text-[#AA0235]">
                    {username.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-lg">{username}</h2>
                <p className="text-sm text-gray-400">{handle}</p>
              </div>
            </div>

            <button
              onClick={handleFollow}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isFollowing
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-[#AA0235] text-white hover:bg-[#8a0228]"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2 text-[#FFC267]">
              {movieTitle} <span className="text-gray-400 text-xl">({year})</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">{review}</p>
            
            <div className="flex items-center gap-2">
              <div className="flex gap-1">{renderStars()}</div>
              <span className="text-sm text-gray-400 ml-2">
                {rating}/5
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-gray-700">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center gap-2 group disabled:opacity-50"
            >
              <i
                className={`bx ${liked ? "bxs-heart" : "bx-heart"} text-2xl transition-all ${
                  liked ? "text-red-500 scale-110" : "text-gray-400 group-hover:text-red-500"
                }`}
              ></i>
              <span className="text-sm text-gray-400">{likeCount}</span>
            </button>

            <button className="flex items-center gap-2 group">
              <i className="bx bx-comment text-2xl text-gray-400 group-hover:text-[#FFC267] transition-colors"></i>
              <span className="text-sm text-gray-400">{initialComments}</span>
            </button>

            <button className="flex items-center gap-2 group">
              <i className="bx bx-share text-2xl text-gray-400 group-hover:text-[#FFC267] transition-colors"></i>
            </button>
          </div>
        </div>

        <div className="w-48 h-72 shrink-0 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src={poster}
            alt={movieTitle}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}