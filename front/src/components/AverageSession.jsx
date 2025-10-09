import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import "../assets/css/Averagesession.css";

const CustomTooltip = ({ active, payload }) => {
  
  if (active === true) {
    if (payload) {
      if (payload.length > 0) {
        return (
          <div className="average-session-tooltip">
            {`${payload[0].value} min`}
          </div>
        );
      }
    }
  }
  
  return null;
};

const CustomCursor = (props) => {
  
  const { points } = props;
  
  if (points) {
    if (points.length > 0) {
      const { x } = points[0];
      const largeur = 258 - x + 12;
      
      return (
        <Rectangle
          x={x}
          y={0}
          width={largeur}
          height={263}
          fill="rgba(0, 0, 0, 0.098)"
        />
      );
    }
  }
  
  return null;
};

const AverageSession = () => {
  
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  
  const { data, loading, error } = useFetch(id, 'average-sessions', mode);
  
  if (loading === true) {
    return (
      <div className="average-session-container average-session-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des sessions...</p>
      </div>
    );
  }
  
  if (error !== null) {
    return (
      <div className="average-session-container average-session-error">
        <i className="fa fa-exclamation-triangle"></i>
        <p>Impossible de charger les sessions</p>
      </div>
    );
  }
  
  if (data === null) {
    return (
      <div className="average-session-container average-session-loading">
        Aucune donnée disponible
      </div>
    );
  }
  
  if (data.sessions === undefined) {
    return (
      <div className="average-session-container average-session-loading">
        Aucune donnée disponible
      </div>
    );
  }
  
  if (data.sessions.length === 0) {
    return (
      <div className="average-session-container average-session-loading">
        Aucune donnée disponible
      </div>
    );
  }
  
  const daysMap = {
    1: "L",
    2: "M",
    3: "M",
    4: "J",
    5: "V",
    6: "S",
    7: "D",
  };
  
  const formattedData = data.sessions.map((session) => {
    const lettreJour = daysMap[session.day];
    const objetFormate = {
      day: lettreJour,
      sessionLength: session.sessionLength,
    };
    return objetFormate;
  });
  
  return (
    <div className="average-session-container">
      
      <div className="average-session-title-wrapper">
        <h3 className="average-session-title">
          Durée moyenne des sessions
        </h3>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 80, right: 0, bottom: 30, left: 0 }}
        >
          
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.403191" />
              <stop offset="81.0441%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "rgba(255, 255, 255, 0.504)",
              fontSize: 12,
              fontWeight: 500,
            }}
            dy={10}
            padding={{ left: 15, right: 15 }}
          />
          
          <YAxis
            hide={true}
            domain={["dataMin - 10", "dataMax + 30"]}
          />
          
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
            wrapperStyle={{ outline: "none" }}
            isAnimationActive={false}
          />
          
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "rgba(255, 255, 255, 0.2)",
              strokeWidth: 10,
              r: 4,
              fill: "#FFFFFF",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default AverageSession;