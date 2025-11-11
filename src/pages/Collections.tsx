import { useState } from "react";
import CollectionCard from "../components/CollectionCard";
import CreateCollectionModal from "../components/CreateCollectionModal";

interface Collection {
  id: number;
  name: string;
  creator: string;
  movieCount: number;
  likes: number;
  thumbnail: string;
  movies: string[];
}

export default function Collections() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const [collections] = useState<Collection[]>([
    {
      id: 1,
      name: "All time favorites",
      creator: "@Ann0",
      movieCount: 3,
      likes: 80,
      thumbnail: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg",
      movies: [
        "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg",
        "https://i.pinimg.com/736x/7c/4a/23/7c4a23a434ef5ff58e9c51e29e4fe909.jpg",
        "https://i.pinimg.com/1200x/4c/29/d6/4c29d6753e61511d6369567214af2f53.jpg"
      ]
    },
    {
      id: 2,
      name: "Crying certified",
      creator: "@cruzee",
      movieCount: 4,
      likes: 582,
      thumbnail: "https://i.pinimg.com/736x/b7/95/44/b795447414c34b18eddc91fdea0fffef.jpg",
      movies: [
        "https://i.pinimg.com/736x/b7/95/44/b795447414c34b18eddc91fdea0fffef.jpg",
        "https://i.pinimg.com/736x/7c/4a/23/7c4a23a434ef5ff58e9c51e29e4fe909.jpg",
        "https://i.pinimg.com/1200x/3c/28/47/3c284737d4ee8eeb333d885f34f66917.jpg",
        "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg"
      ]
    },
    {
      id: 3,
      name: "Terror in the house",
      creator: "@cokl3",
      movieCount: 3,
      likes: 65,
      thumbnail: "https://i.pinimg.com/736x/51/26/08/512608d675fd98fca4105f90ab7d6d5c.jpg",
      movies: [
        "https://i.pinimg.com/736x/51/26/08/512608d675fd98fca4105f90ab7d6d5c.jpg",
        "https://i.pinimg.com/736x/61/4e/f2/614ef2b62f2ba21bc75cf0fa7f0c56c5.jpg",
        "https://i.pinimg.com/1200x/4c/29/d6/4c29d6753e61511d6369567214af2f53.jpg"
      ]
    }
  ]);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1B1B1F] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              C<span className="text-[#FFC267]">o</span>llections
              <sup className="text-[#FFC267] text-2xl">2</sup>
            </h1>
            <p className="text-gray-400">
              Find movie's collections that inspire you made by the community
            </p>
          </div>

          {/* Search */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-[#26242E] text-white border border-gray-700 rounded-full focus:outline-none focus:border-[#FFC267]"
            />
            <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        {/* Create button */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-8 px-6 py-3 border-2 border-dashed border-[#FFC267] text-[#FFC267] rounded-lg hover:bg-[#FFC267] hover:bg-opacity-10 transition-all"
        >
          Create a collection
        </button>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No collections found 😢</p>
          </div>
        )}
      </div>

      {showModal && <CreateCollectionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}