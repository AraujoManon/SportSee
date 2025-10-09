import { useState } from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [mode, setMode] = useState("mock");
  
  return (
    <section className="welcome-page">
      <article className="welcome-mode-section">
        <h1 className="welcome-mode-title">Choisissez entre mock et api</h1>
        <p className="welcome-mode-current">Mode actuel : {mode}</p>
        <div className="welcome-button-mode">
          <button 
            className={`welcome-mode-btn ${mode === "mock" ? "active" : ""}`}
            onClick={() => setMode("mock")}
          >
            Mock
          </button>
          <button 
            className={`welcome-mode-btn ${mode === "api" ? "active" : ""}`}
            onClick={() => setMode("api")}
          >
            API
          </button>
        </div>
      </article>
      
      <article className="welcome-user-section">
        <h2 className="welcome-user-title">Utilisateurs disponibles :</h2>
        <Link className="welcome-user-link" to={`/user/12?mode=${mode}`}>
          Utilisateur 12
        </Link>
        <Link className="welcome-user-link" to={`/user/18?mode=${mode}`}>
          Utilisateur 18
        </Link>
      </article>
    </section>
  );
};

export default WelcomePage;