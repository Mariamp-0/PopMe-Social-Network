import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Post from "./components/Post";

interface PostData {
  id: number;
  userName: string;
  userHandle: string;
  movieTitle: string;
  year: number;
  rating: number;
  reviewText: string;
  movieImage: string;
  userImage: string;
}

export default function App() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch("/data/postData.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    const filtered = posts.filter((post) =>
      post.movieTitle.toLowerCase().includes(lower)
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-[#1B1B1F] text-white px-6 py-8 flex flex-col items-center">
      {/* 🔍 Barra de búsqueda */}
      <div className="w-full max-w-md mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 🎞️ Lista de posts */}
      <div className="w-full max-w-4xl space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post
              key={post.id}
              username={post.userName}
              handle={post.userHandle}
              movieTitle={post.movieTitle}
              year={post.year}
              review={post.reviewText}
              rating={post.rating}
              poster={post.movieImage}
              popcornUrl="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            />
          ))
        ) : (
          <p className="text-center text-gray-400">
            No se encontraron resultados 😢
          </p>
        )}
      </div>
    </div>
  );
}
