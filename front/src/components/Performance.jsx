import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const Performance = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { data, loading, error } = useFetch(id, 'performance', mode);
  
  if (loading === true) {
    return (
      <div className="performance-container performance-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des performances...</p>
      </div>
    );
  }
  
  if (error !== null) {
    return (
      <div className="performance-container performance-error">
        <i className="fa fa-exclamation-triangle"></i>
        <p>Impossible de charger les performances</p>
      </div>
    );
  }
  
  if (data === null) {
    return (
      <div className="performance-container performance-loading">
        Aucune donnée disponible
      </div>
    );
  }
  
  if (data.data === undefined) {
    return (
      <div className="performance-container performance-loading">
        Aucune donnée disponible
      </div>
    );
  }
  
  if (data.kind === undefined) {
    return (
      <div className="performance-container performance-loading">
        Aucune donnée disponible
      </div>
    );
  }
  
  const kindMap = {
    1: 'Cardio',
    2: 'Energie',
    3: 'Endurance',
    4: 'Force',
    5: 'Vitesse',
    6: 'Intensité'
  };
  
  const orderMap = {
    'Intensité': 0,
    'Vitesse': 1,
    'Force': 2,
    'Endurance': 3,
    'Energie': 4,
    'Cardio': 5
  };
  
  const donneesTransformees = data.data.map((item) => {
    
    let nomCategorie;
    
    if (kindMap[item.kind] !== undefined) {
      nomCategorie = kindMap[item.kind];
    }
    else {
      nomCategorie = data.kind[item.kind];
    }
    
    const objetFormate = {
      subject: nomCategorie,
      value: item.value,
      fullMark: 250
    };
    
    return objetFormate;
  });
  
  const donneeTriees = donneesTransformees.sort((a, b) => {
    const ordreA = orderMap[a.subject];
    const ordreB = orderMap[b.subject];
    const difference = ordreA - ordreB;
    return difference;
  });
  
  const formattedData = donneeTriees;
  
  const renderPolarAngleAxisTick = ({ payload, x, y, cx, cy, ...rest }) => {
    return (
      <text 
        {...rest}
        x={x}
        y={y}
        className="performance-axis-label" 
      >
        {payload.value}
      </text>
    );
  };
  
  return (
    <div className="performance-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart 
          data={formattedData}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }} 
        >
          
          <PolarGrid 
            radialLines={false}
            gridType="polygon"
            polarRadius={[10, 20, 35, 50, 65, 80]}
            stroke="#FFFFFF"       
            strokeWidth={1}       
          />
          
          <PolarAngleAxis 
            dataKey="subject"
            tick={renderPolarAngleAxisTick}
            stroke="none"
          />
          
          <PolarRadiusAxis
            angle={90}
            domain={[0, 250]}
            tick={false}
            axisLine={false}
          />
          
          <Radar 
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
            strokeWidth={0}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;