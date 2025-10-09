import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import calories from "../assets/images/calories-icon.png";
import protein from "../assets/images/protein-icon.png";
import carbs from "../assets/images/carbs-icon.png";
import fat from "../assets/images/fat-icon.png";

const Indicator = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { data, loading, error } = useFetch(id, 'user', mode);
  
  if (loading === true) {
    return (
      <section className="indicator">
        <div className="indicator-loading">
          <div className="loading-spinner"></div>
          <p>Chargement des indicateurs...</p>
        </div>
      </section>
    );
  }
  
  if (error !== null) {
    return (
      <section className="indicator">
        <div className="indicator-error">
          <i className="fa fa-exclamation-triangle"></i>
          <p>Impossible de charger les indicateurs</p>
        </div>
      </section>
    );
  }
  
  const defaultKeyData = {
    calorieCount: 0,
    proteinCount: 0,
    carbohydrateCount: 0,
    lipidCount: 0
  };
  
  let keyData;
  
  if (data === null) {
    keyData = defaultKeyData;
  }
  else {
    if (data.keyData !== undefined) {
      keyData = data.keyData;
    }
    else {
      keyData = defaultKeyData;
    }
  }
  
  const indicateurs = [
    {
      key: "calories",
      value: keyData.calorieCount,
      unite: "kCal",
      label: "Calories",
      icon: calories,
      className: "indicator-calories"
    },
    {
      key: "proteines",
      value: keyData.proteinCount,
      unite: "g",
      label: "Protéines",
      icon: protein,
      className: "indicator-protein"
    },
    {
      key: "glucides",
      value: keyData.carbohydrateCount,
      unite: "g",
      label: "Glucides",
      icon: carbs,
      className: "indicator-carbs"
    },
    {
      key: "lipides",
      value: keyData.lipidCount,
      unite: "g",
      label: "Lipides",
      icon: fat,
      className: "indicator-fat"
    }
  ];
  
  return (
    <section className="indicator">
      {indicateurs.map((indicateur) => {
        return (
          <article 
            key={indicateur.key}
            className={`indicator-card ${indicateur.className}`}
          >
            <div className="indicator-icon">
              <img 
                src={indicateur.icon}
                alt={indicateur.label}
                className="indicator-icon-img"
              />
            </div>
            
            <div className="indicator-content">
              <h3 className="indicator-value">
                {indicateur.value.toLocaleString('fr-FR')}{indicateur.unite}
              </h3>
              <p className="indicator-label">
                {indicateur.label}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Indicator;