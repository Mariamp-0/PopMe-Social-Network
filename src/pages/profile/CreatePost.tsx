import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Puedes usar el mismo CSS o crear uno nuevo si prefieres

export default function CreatePost() {
  const navigate = useNavigate();

  return (
    <div className="create-post-page">
      {/* Header */}
      <header className="create-header">
        <div className="logo">
          Pop<span>me</span>
        </div>

        {/* Botón de volver */}
        <button className="back-btn" onClick={() => navigate("/profile")}>
          <i className="bx bx-arrow-back"></i> Back to Profile
        </button>
      </header>

      {/* Contenedor principal */}
      <section className="create-container">
        <div className="create-card">
          <h2>Create a new post</h2>
          <div className="user-info">
            <img
              src="https://i.pinimg.com/564x/49/73/b7/4973b71e8d30a3b0c7cb1969c4b134db.jpg"
              alt="User"
              className="user-avatar"
            />
            <p>@sam.wood</p>
          </div>

          {/* Formulario */}
          <div className="form-section">
            <input
              type="text"
              placeholder="Search for a movie"
              className="input-box"
            />
            <textarea
              placeholder="Write your review..."
              className="textarea-box"
              rows={4}
            />
            <input
              type="text"
              placeholder="Would you recommend this movie?"
              className="input-box"
            />

            {/* Sección de multimedia */}
            <div className="media-section">
              <div className="upload-box">
                <i className="bx bx-plus"></i>
              </div>
              <p className="upload-label">Add photos or videos</p>
              <div className="popcorn-rating">
                <i className="bx bxs-popcorn"></i>
                <i className="bx bxs-popcorn"></i>
                <i className="bx bxs-popcorn"></i>
                <i className="bx bxs-popcorn"></i>
                <i className="bx bxs-popcorn"></i>
              </div>
            </div>

            {/* Botón publicar */}
            <button className="publish-btn">Publish</button>
          </div>
        </div>
      </section>
    </div>
  );
}
