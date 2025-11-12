import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "Samuel Miller",
    handle: "@sam.wood",
    bio: "Let’s go and catch some popcorn!!! 🍿",
    followers: "10k",
    following: "350",
    posts: "2,500",
    joined: "March 2019",
    image:
      "https://i.pinimg.com/564x/49/73/b7/4973b71e8d30a3b0c7cb1969c4b134db.jpg",
  };

  const stats = [
    { label: "Movies reviewed", value: 6 },
    { label: "Collections created", value: 2 },
    { label: "Collections saved", value: 0 },
    { label: "Reviews liked", value: 5 },
    { label: "Comments", value: 7 },
  ];

  const handleCreatePost = () => {
    navigate("/profile/create-post");
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="logo">
          Pop<span>me</span>
        </div>
        <p>Hey Sam! This is your profile</p>
      </header>

      {/* User section */}
      <section className="user-section">
        <div className="user-card">
          <img src={user.image} alt="User" className="user-photo" />
          <div className="user-info">
            <h2>{user.name}</h2>
            <p className="handle">{user.handle}</p>
            <p className="bio">{user.bio}</p>
            <div className="user-stats">
              <div>
                <strong>{user.followers}</strong>
                <span>followers</span>
              </div>
              <div>
                <strong>{user.following}</strong>
                <span>following</span>
              </div>
              <div>
                <strong>{user.posts}</strong>
                <span>posts</span>
              </div>
            </div>
            <p className="joined">Joined {user.joined}</p>
          </div>
          <button className="edit-btn" onClick={() => navigate("/profile/edit")}>
            <i className="bx bx-edit"></i>
          </button>
        </div>
      </section>

      {/* Latest posts */}
      <section className="latest-posts">
        <h3>Latest post</h3>
        <div className="posts-wrapper">
          <div className="post-card">
            <img
              src="https://m.media-amazon.com/images/I/91N2IJgtXzL._AC_UF894,1000_QL80_.jpg"
              alt="Jurassic World"
            />
            <div className="post-info">
              <h4>Jurassic World (Rebirth)</h4>
              <p>One of the best reboots — still surprises me!</p>
            </div>
          </div>
          <div className="post-card">
            <img
              src="https://m.media-amazon.com/images/I/81Qe+9dT1nL.jpg"
              alt="Planet of the Apes"
            />
            <div className="post-info">
              <h4>Kingdom of the Planet of the Apes</h4>
              <p>Perfect mix of action and emotion 🦍</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <h3>Pop stats</h3>
        <p className="stats-desc">Check out your movie statistics</p>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${index % 2 === 0 ? "yellow" : "pink"}`}
            >
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Botón flotante “+” */}
      <button className="floating-btn" onClick={() => navigate("/profile/create-post")}>
  <i className="bx bx-plus"></i>
</button>
    </div>
  );
}
