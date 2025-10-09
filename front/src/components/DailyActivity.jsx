import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../assets/css/DailyActivity.css";

const CustomTooltip = ({ active, payload }) => {
  
  if (active === true) {
    if (payload) {
      if (payload.length > 0) {
        return (
          <div className="daily-activity-tooltip">
            <p className="tooltip-text">{`${payload[0].value}kg`}</p>
            <p className="tooltip-text">{`${payload[1].value}Kcal`}</p>
          </div>
        );
      }
    }
  }
  
  return null;
};

const CustomYAxisTickRight = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y}
      fill="#9B9EAC"
      fontSize={14}
      textAnchor="start"
      dx={10}
    >
      {payload.value}
    </text>
  );
};

const DailyActivity = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { data, loading, error } = useFetch(id, 'activity', mode);
  
  if (loading === true) {
    return (
      <div className="daily-activity-container">
        <div className="loading-spinner"></div>
        <p>Chargement de l'activité...</p>
      </div>
    );
  }
  
  if (error !== null) {
    return (
      <div className="daily-activity-container">
        <div className="component-error">
          <i className="fa fa-exclamation-triangle"></i>
          <p>Impossible de charger l'activité quotidienne</p>
        </div>
      </div>
    );
  }
  
  if (data === null) {
    return (
      <div className="daily-activity-container">
        <div className="no-data">Aucune donnée d'activité disponible</div>
      </div>
    );
  }
  
  if (data.sessions === undefined) {
    return (
      <div className="daily-activity-container">
        <div className="no-data">Aucune donnée d'activité disponible</div>
      </div>
    );
  }
  
  if (data.sessions.length === 0) {
    return (
      <div className="daily-activity-container">
        <div className="no-data">Aucune donnée d'activité disponible</div>
      </div>
    );
  }
  
  const formattedData = data.sessions.map((session, index) => {
    return {
      jour: index + 1,
      poids: session.kilogram,
      calories: session.calories,
    };
  });
  
  const weights = formattedData.map((d) => d.poids);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  
  const calories = formattedData.map((d) => d.calories);
  const minCalories = Math.min(...calories);
  const maxCalories = Math.max(...calories);
  
  let yAxisWeightTicks;
  let yAxisWeightDomain;
  let yAxisCaloriesTicks;
  let yAxisCaloriesDomain;
  
  if (id === "12") {
    
    if (mode === "mock") {
      yAxisWeightTicks = [85, 89, 93];
      yAxisWeightDomain = [85, 93];
      yAxisCaloriesTicks = [450, 490, 530];
      yAxisCaloriesDomain = [450, 530];
    }
    
    if (mode === "api") {
      yAxisWeightTicks = [69, 76, 83];
      yAxisWeightDomain = [69, 83];
      yAxisCaloriesTicks = [150, 275, 400];
      yAxisCaloriesDomain = [150, 400];
    }
  }
  
  if (id === "18") {
    
    if (mode === "mock") {
      yAxisWeightTicks = [54, 56, 59];
      yAxisWeightDomain = [54, 59];
      yAxisCaloriesTicks = [100, 175, 250];
      yAxisCaloriesDomain = [100, 250];
    }
    
    if (mode === "api") {
      yAxisWeightTicks = [65, 68, 71];
      yAxisWeightDomain = [65, 71];
      yAxisCaloriesTicks = [0, 250, 500];
      yAxisCaloriesDomain = [0, 500];
    }
  }
  
  if (id !== "12") {
    if (id !== "18") {
      
      const weightPadding = 2;
      const somme = minWeight + maxWeight;
      const division = somme / 2;
      const middleWeight = Math.round(division);
      
      const valeurBasse = minWeight - weightPadding;
      const valeurBasseFinal = Math.floor(valeurBasse);
      
      const valeurHaute = maxWeight + weightPadding;
      const valeurHauteFinal = Math.ceil(valeurHaute);
      
      yAxisWeightTicks = [
        valeurBasseFinal,
        middleWeight,
        valeurHauteFinal,
      ];
      
      yAxisWeightDomain = [yAxisWeightTicks[0], yAxisWeightTicks[2]];
      
      const caloriesPadding = 50;
      
      const sommeCalories = minCalories + maxCalories;
      const divisionCalories = sommeCalories / 2;
      const middleCalories = Math.round(divisionCalories);
      
      const caloriesBasseAvecMarge = minCalories - caloriesPadding;
      const caloriesBasseDivisee = caloriesBasseAvecMarge / 50;
      const caloriesBasseArrondie = Math.floor(caloriesBasseDivisee);
      const caloriesBasseFinal = caloriesBasseArrondie * 50;
      
      const caloriesMilieuDivisee = middleCalories / 50;
      const caloriesMilieuArrondie = Math.round(caloriesMilieuDivisee);
      const caloriesMilieuFinal = caloriesMilieuArrondie * 50;
      
      const caloriesHauteAvecMarge = maxCalories + caloriesPadding;
      const caloriesHauteDivisee = caloriesHauteAvecMarge / 50;
      const caloriesHauteArrondie = Math.ceil(caloriesHauteDivisee);
      const caloriesHauteFinal = caloriesHauteArrondie * 50;
      
      yAxisCaloriesTicks = [
        caloriesBasseFinal,
        caloriesMilieuFinal,
        caloriesHauteFinal,
      ];
      
      yAxisCaloriesDomain = [yAxisCaloriesTicks[0], yAxisCaloriesTicks[2]];
    }
  }
  
  return (
    <div className="daily-activity-container">
      
      <div className="daily-activity-header">
        <h3 className="daily-activity-title">Activité quotidienne</h3>
        
        <div className="daily-activity-legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot-black"></span>
            Poids (kg)
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-dot-red"></span>
            Calories brûlées (kCal)
          </span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={formattedData}
          barGap={8}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#DEDEDE"
          />
          
          <XAxis
            dataKey="jour"
            tickLine={false}
            stroke="#9B9EAC"
            tick={{ fontSize: 14, fill: "#9B9EAC" }}
            axisLine={{
              stroke: "#DEDEDE",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
            dy={10}
          />
          
          <YAxis
            yAxisId="calories"
            orientation="left"
            domain={yAxisCaloriesDomain}
            ticks={yAxisCaloriesTicks}
            hide={true}
          />
          
          <YAxis
            yAxisId="poids"
            orientation="right"
            domain={yAxisWeightDomain}
            ticks={yAxisWeightTicks}
            tickCount={3}
            tickLine={false}
            axisLine={false}
            tick={<CustomYAxisTickRight />}
          />
          
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
            wrapperStyle={{ outline: "none" }}
          />
          
          <Bar
            yAxisId="poids"
            dataKey="poids"
            fill="#282D30"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
          
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
          
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default DailyActivity;