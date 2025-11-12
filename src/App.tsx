import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import SearchBar from "./components/SearchBar";
import Post from "./components/Post";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import CreatePost from "./pages/profile/CreatePost";
import "./App.css";

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
    <Router>
      <div className="min-h-screen bg-[#1B1B1F] text-white">
        <Routes>
          {/* 🏠 Home con header y sidebar */}
          <Route
            path="/"
            element={
              <>
                <Sidebar
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
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
                    <SearchBar onSearch={handleSearch} />
                  </div>
                </header>

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
              </>
            }
          />

          {/* 👤 Páginas a pantalla completa */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}
