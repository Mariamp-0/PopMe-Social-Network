import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Post from "./components/Post";
import Sidebar from "./components/sidebar/sidebar";
import CollectionsPage from "./pages/Collections";

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
  const [activePage, setActivePage] = useState("Home");
  const [collectionsSearch, setCollectionsSearch] = useState(""); // 👈 nuevo

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
    <div className="min-h-screen bg-[#1B1B1F] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectMenu={setActivePage}
      />

      <header className="sticky top-0 z-10 bg-[#26242E] shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[#AA0235] hover:text-[#FFC267] transition"
            >
              <i className="bx bx-menu text-3xl"></i>
            </button>
            <h1 className="text-3xl font-bold text-[#AA0235] flex-1 text-center">
              🎬 PopMe Social Network
            </h1>
            <div className="w-8"></div>
          </div>

          {/* Buscador de Home */}
          {activePage === "Home" && <SearchBar onSearch={handleSearch} />}

          {/* Buscador de Collections - centrado */}
          {activePage === "Collections" && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search"
                  value={collectionsSearch}
                  onChange={(e) => setCollectionsSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-[#1B1B1F] text-white border border-gray-700 rounded-full focus:outline-none focus:border-[#FFC267] transition"
                />
                <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {activePage === "Home" && (
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
        )}

        {/* Collections con búsqueda desde App */}
        {activePage === "Collections" && (
          <CollectionsPage searchQuery={collectionsSearch} />
        )}
      </main>
    </div>
  );
}