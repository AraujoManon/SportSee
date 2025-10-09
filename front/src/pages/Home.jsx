import { useParams, useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import Header from "../components/Header.jsx";
import VerticalNav from "../components/VerticalNav";
import DailyActivity from "../components/DailyActivity";
import Indicator from "../components/indicator.jsx";
import Score from "../components/Score";
import Performance from "../components/Performance";
import AverageSession from "../components/AverageSession";

const Home = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { data: userData, loading, error } = useFetch(id, 'user', mode);
  
  if (loading === true) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }
  
  if (error !== null) {
    return (
      <div className="home-error">
        <div className="error-icon">
          <i className="fa fa-exclamation-triangle"></i>
        </div>
        <h2>Erreur de chargement</h2>
        <p>{error}</p>
        {mode === 'api' && (
          <p style={{ fontSize: '14px', marginTop: '10px', color: '#FF0101' }}>
            💡 Conseil : Vérifiez que votre serveur backend est démarré sur le port 3000
          </p>
        )}
        <Link to="/" className="error-button">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  if (userData === null || userData === undefined) {
    return (
      <div className="home-error">
        <div className="error-icon">
          <i className="fa fa-exclamation-triangle"></i>
        </div>
        <h2>Aucune donnée disponible</h2>
        <p>Impossible de charger les données utilisateur</p>
        <Link to="/" className="error-button">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  if (userData.userInfos === undefined || userData.userInfos === null) {
    return (
      <div className="home-error">
        <div className="error-icon">
          <i className="fa fa-exclamation-triangle"></i>
        </div>
        <h2>Données invalides</h2>
        <p>Les informations utilisateur sont manquantes</p>
        <Link to="/" className="error-button">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  if (userData.userInfos.firstName === undefined || userData.userInfos.firstName === null) {
    return (
      <div className="home-error">
        <div className="error-icon">
          <i className="fa fa-exclamation-triangle"></i>
        </div>
        <h2>Données incomplètes</h2>
        <p>Le nom d'utilisateur est manquant</p>
        <Link to="/" className="error-button">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      
      <div className="home">
        <VerticalNav />
        
        <div className="home-content">
          
          <article className="hello">
            <h1>
              Bonjour <span className="userName">{userData.userInfos.firstName}</span>
            </h1>
            <p className="congratulation">
              Félicitation ! Vous avez explosé vos objectifs hier
            </p>
          </article>
          
          <section className="graphics">
            
            <DailyActivity />
            
            <div className="bottomGraphic">
              <AverageSession />
              <Performance />
              <Score />
            </div>
            
          </section>
        </div>
        
        <aside className="home-indicator">
          <Indicator />
        </aside>
        
      </div>
    </>
  );
};

export default Home;