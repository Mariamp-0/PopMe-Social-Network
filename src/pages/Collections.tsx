import { useState } from "react";
import CollectionsTitle from "../components/CollectionsTitle";
import CollectionCard from "../components/CollectionCard";
import CreateCollection from "./CreateCollection";
import UserCollections from "./UserCollections"; // 👈 importa tu vista de colecciones personales

interface CollectionsPageProps {
  searchQuery: string; // 👈 recibe el search desde App
}

export default function CollectionsPage({ searchQuery }: CollectionsPageProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserCollections, setShowUserCollections] = useState(false); // 👈 nuevo estado

  // Mock data con películas reales
  const [collections, setCollections] = useState([
    {
      id: 1,
      title: "All time favorites",
      author: "@Ann0",
      description: "Classic movies that never get old",
      likes: 80,
      moviesCount: 3,
      movies: [
        "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg",
        "https://i.pinimg.com/736x/7c/4a/23/7c4a23a434ef5ff58e9c51e29e4fe909.jpg",
        "https://i.pinimg.com/1200x/4c/29/d6/4c29d6753e61511d6369567214af2f53.jpg"
      ]
    },
    {
      id: 2,
      title: "Crying certified",
      author: "@cruzee",
      description: "Movies that will make you emotional",
      likes: 582,
      moviesCount: 4,
      movies: [
        "https://i.pinimg.com/736x/b7/95/44/b795447414c34b18eddc91fdea0fffef.jpg",
        "https://i.pinimg.com/736x/7c/4a/23/7c4a23a434ef5ff58e9c51e29e4fe909.jpg",
        "https://i.pinimg.com/1200x/3c/28/47/3c284737d4ee8eeb333d885f34f66917.jpg",
        "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg"
      ]
    },
    {
      id: 3,
      title: "Terror in the house",
      author: "@cokl3",
      description: "Spooky movies for a scary night",
      likes: 65,
      moviesCount: 3,
      movies: [
        "https://i.pinimg.com/736x/51/26/08/512608d675fd98fca4105f90ab7d6d5c.jpg",
        "https://i.pinimg.com/736x/61/4e/f2/614ef2b62f2ba21bc75cf0fa7f0c56c5.jpg",
        "https://i.pinimg.com/1200x/4c/29/d6/4c29d6753e61511d6369567214af2f53.jpg"
      ]
    }
  ]);

  const handleLike = (id: number) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handleImageChange = (id: number) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === id && c.movies.length > 0) {
          const currentIndex = c.movies.indexOf(c.movies[0]);
          const nextIndex = (currentIndex + 1) % c.movies.length;
          const rotatedMovies = [
            ...c.movies.slice(nextIndex),
            ...c.movies.slice(0, nextIndex)
          ];
          return { ...c, movies: rotatedMovies };
        }
        return c;
      })
    );
  };

  // Filtra con el searchQuery que viene desde App
  const filteredCollections = collections.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Si el usuario abre su vista de colecciones personales
  if (showUserCollections) {
    return <UserCollections onBack={() => setShowUserCollections(false)} />;
  }

  if (showCreateModal) {
    return <CreateCollection onBack={() => setShowCreateModal(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#1B1B1F] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Collections Title centrado - SIN buscador ya */}
        <div className="text-center mb-8">
          <CollectionsTitle />
          <p className="text-gray-400 mt-2">
            Find movie's collections that inspire you made by the community
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-3 border-2 border-dashed border-[#FFC267] text-[#FFC267] rounded-lg hover:bg-[#FFC267] hover:bg-opacity-10 transition-all font-medium"
          >
            Create a collection
          </button>

          {/* 💡 Botón “View your collections” */}
          <button
            onClick={() => setShowUserCollections(true)}
            className="px-8 py-3 bg-[#FFC267] text-[#1B1B1F] rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            View your collections
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onLike={() => handleLike(collection.id)}
              onImageClick={() => handleImageChange(collection.id)}
            />
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No collections found 😢</p>
          </div>
        )}
      </div>
    </div>
  );
}
