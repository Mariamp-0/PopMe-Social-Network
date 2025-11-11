<<<<<<< HEAD

import Sidebar from "./components/sidebar/sidebar"; // import your menu
import Main from "./pages/Main"; // main page component
import "./App.css"; // import the layout styles

export default function App() {
   return (
    <div className="app-container">
      {/* sidebar */}
      <Sidebar />
      
      {/* main content */}
      <main className="main-content">
        <Main />
      </main>
    </div>
  );
}
 

=======
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Post from "./components/Post";
import Sidebar from "./components/sidebar/sidebar";

// Definición del tipo de datos de cada post
interface PostData {
  id: number;
  userName: string;
  userHandle: string;
  userImage: string;
  movieTitle: string;
  year: number;
  rating: number;
  reviewText: string;
  movieImage: string;
}

export default function App() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#1B1B1F] text-white">
      {/* Sidebar desplegable */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header con título y barra de búsqueda */}
      <header className="sticky top-0 z-10 bg-[#26242E] shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            {/* Botón del menú hamburguesa */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[#AA0235] hover:text-[#FFC267] transition"
            >
              <i className="bx bx-menu text-3xl"></i>
            </button>
            
            <h1 className="text-3xl font-bold text-[#AA0235] flex-1 text-center">
              🎬 PopMe Social Network
            </h1>
            
            {/* Espacio para mantener el título centrado */}
            <div className="w-8"></div>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Feed de posts */}
      <main className="max-w-4xl mx-auto px-6 py-6">
        <div className="space-y-6">
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
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No se encontraron resultados 😢
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
>>>>>>> 922f5dc4f9f572b56d6976f15cbb303972715576
