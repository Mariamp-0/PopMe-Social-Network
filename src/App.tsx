import { useEffect, useState } from "react";
import Main from "./pages/Main";
import SearchBar from "./components/SearchBar";
import Post from "./components/Post";

// Definición del tipo de datos de cada post
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

  // Cargar los datos del JSON al montar el componente
  useEffect(() => {
    fetch("/data/postData.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  // Filtrar los posts según el término de búsqueda
  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    const filtered = posts.filter((post) =>
      post.movieTitle.toLowerCase().includes(lower)
    );
    setFilteredPosts(filtered);
  };

  // Render principal
  return (
    <div className="min-h-screen bg-[#1B1B1F] text-white p-6">
      {/* Página principal */}
      <Main />

      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-6 text-[#AA0235]">
        🎬 PopMe Social Network
      </h1>

      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Lista de posts */}
      <div className="mt-6 space-y-4">
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
              popcornUrl="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
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
