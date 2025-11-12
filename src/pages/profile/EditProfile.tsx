import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setForm(JSON.parse(storedUser));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/profile");
  };

  return (
    <div className="profile-page">
      <h1>Editar Perfil ✏️</h1>
      <input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        placeholder="Tu nombre"
        className="input"
      />
      <input
        name="bio"
        value={form.bio || ""}
        onChange={handleChange}
        placeholder="Tu biografía"
        className="input"
      />
      <button onClick={handleSave} className="btn-publish">
        Guardar cambios
      </button>
    </div>
  );
}
