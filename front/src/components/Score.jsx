import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from "recharts";

const Score = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { data, loading, error } = useFetch(id, 'user', mode);
  
  if (loading === true) {
    return (
      <div className="score-container score-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du score...</p>
      </div>
    );
  }
  
  if (error !== null) {
    return (
      <div className="score-container score-error">
        <i className="fa fa-exclamation-circle"></i>
        <p>Impossible de charger le score</p>
      </div>
    );
  }
  
  if (data === null) {
    return (
      <div className="score-container">
        <p>Aucune donnée</p>
      </div>
    );
  }
  
  let score;
  
  if (data.todayScore !== undefined) {
    score = data.todayScore;
  }
  else if (data.score !== undefined) {
    score = data.score;
  }
  else {
    score = 0;
  }
  
  const pourcentage = score * 100;
  
  const chartData = [
    {
      value: pourcentage,
      fill: '#FF0000'
    }
  ];
  
  const pourcentageAffiche = Math.round(pourcentage);
  
  return (
    <div className="score-container">
      <h3 className="score-title">Score</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={85}
          barSize={10}
          data={chartData}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: '#FFFFFF' }}
            clockWise={false}
            dataKey="value"
            cornerRadius={10}
            fill="#FF0000"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      <div className="score-center">
        <div className="score-percentage">
          {pourcentageAffiche}%
        </div>
        <div className="score-text">de votre</div>
        <div className="score-text">objectif</div>
      </div>
    </div>
  );
};

export default Score;