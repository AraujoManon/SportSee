import { useParams, useSearchParams, Link } from "react-router-dom";

const Error = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  
  const mode = searchParams.get("mode");
  const type = searchParams.get("type");
  const message = searchParams.get("message");
  
  let messageErreur = "Page introuvable";
  let detailErreur = "La page que vous recherchez n'existe pas";
  let codeErreur = "404";
  
  if (id) {
    
    if (type) {
      
      if (type === "error" && message) {
        messageErreur = "Erreur de chargement";
        detailErreur = decodeURIComponent(message);
        codeErreur = "500";
      }
      
      else if (type === "no-data") {
        messageErreur = "Aucune donnée disponible";
        detailErreur = "Impossible de charger les données utilisateur";
        codeErreur = "500";
      }
      
      else if (type === "invalid-data") {
        messageErreur = "Données invalides";
        detailErreur = "Les informations utilisateur sont manquantes ou corrompues";
        codeErreur = "500";
      }
      
      else if (type === "incomplete-data") {
        messageErreur = "Données incomplètes";
        detailErreur = "Le nom d'utilisateur est manquant dans les données";
        codeErreur = "500";
      }
    }
    
    else {
      
      if (mode === null) {
        messageErreur = "Mode manquant";
        detailErreur = "Vous devez spécifier un mode : ?mode=mock ou ?mode=api";
        codeErreur = "400";
      }
      else if (mode !== "mock" && mode !== "api") {
        messageErreur = "Mode invalide";
        detailErreur = `Le mode "${mode}" n'existe pas. Utilisez "mock" ou "api"`;
        codeErreur = "400";
      }
      else if (id !== "12" && id !== "18") {
        messageErreur = "Utilisateur introuvable";
        detailErreur = `L'utilisateur ${id} n'existe pas. Les utilisateurs disponibles sont 12 et 18`;
        codeErreur = "404";
      }
    }
  }
  
  return (
    <div className="error-page">
      
      <div className="error-icon">
        <i className="fa fa-exclamation-circle"></i>
      </div>
      
      <h1 className="error-title">{messageErreur}</h1>
      
      <p className="error-detail">{detailErreur}</p>
      
      <p className="error-code">Erreur {codeErreur}</p>
      
      <Link to="/" className="error-button">
        Retour à l'accueil
      </Link>
      
    </div>
  );
};

export default Error;