const DONNEES_MOCK = {
    utilisateurs: {
      "12": {
        id: 12,
        userInfos: {
          firstName: "Jean-MOCK",
          lastName: "TestDev",
          age: 45,
        },
        score: 0.89,
        keyData: {
          calorieCount: 3200,
          proteinCount: 250,
          carbohydrateCount: 420,
          lipidCount: 95,
        },
      },
      "18": {
        id: 18,
        userInfos: {
          firstName: "Marie-MOCK",
          lastName: "TestQA",
          age: 52,
        },
        score: 0.67, 
        keyData: {
          calorieCount: 1650,
          proteinCount: 180,
          carbohydrateCount: 280,
          lipidCount: 40,
        },
      },
    },
    
    activite: {
      "12": {
        userId: 12,
        sessions: [
          { day: "2020-07-01", kilogram: 92, calories: 520 },
          { day: "2020-07-02", kilogram: 91, calories: 480 },
          { day: "2020-07-03", kilogram: 90, calories: 510 },
          { day: "2020-07-04", kilogram: 89, calories: 490 },
          { day: "2020-07-05", kilogram: 88, calories: 530 },
          { day: "2020-07-06", kilogram: 87, calories: 470 },
          { day: "2020-07-07", kilogram: 86, calories: 500 },
        ],
      },
      "18": {
        userId: 18,
        sessions: [
          { day: "2020-07-01", kilogram: 58, calories: 140 },
          { day: "2020-07-02", kilogram: 57, calories: 160 },
          { day: "2020-07-03", kilogram: 57, calories: 180 },
          { day: "2020-07-04", kilogram: 56, calories: 200 },
          { day: "2020-07-05", kilogram: 56, calories: 220 },
          { day: "2020-07-06", kilogram: 55, calories: 190 },
          { day: "2020-07-07", kilogram: 55, calories: 210 },
        ],
      },
    },
    
    "average-sessions": {
      12: {
        sessions: [
          { day: 1, sessionLength: 30 },
          { day: 2, sessionLength: 40 },
          { day: 3, sessionLength: 50 },
          { day: 4, sessionLength: 30 },
          { day: 5, sessionLength: 30 },
          { day: 6, sessionLength: 50 },
          { day: 7, sessionLength: 50 }
        ]
      },
      18: {
        sessions: [
          { day: 1, sessionLength: 30 },
          { day: 2, sessionLength: 23 },
          { day: 3, sessionLength: 45 },
          { day: 4, sessionLength: 50 },
          { day: 5, sessionLength: 0 },
          { day: 6, sessionLength: 0 },
          { day: 7, sessionLength: 60 }
        ]
      }
    },
    
    performance: {
      "12": {
        userId: 12,
        kind: {
          1: "cardio",
          2: "energy",
          3: "endurance",
          4: "strength",
          5: "speed",
          6: "intensity",
        },
        data: [
          { value: 220, kind: 1 },
          { value: 230, kind: 2 },
          { value: 210, kind: 3 },
          { value: 200, kind: 4 },
          { value: 180, kind: 5 },
          { value: 240, kind: 6 },
        ],
      },
      "18": {
        userId: 18,
        kind: {
          1: "cardio",
          2: "energy",
          3: "endurance",
          4: "strength",
          5: "speed",
          6: "intensity",
        },
        data: [
          { value: 120, kind: 1 },
          { value: 100, kind: 2 },
          { value: 140, kind: 3 },
          { value: 160, kind: 4 },
          { value: 130, kind: 5 },
          { value: 150, kind: 6 },
        ],
      },
    },
  };
  
  export const getMockData = (userId, type = 'user') => {
    
    switch(type) {
      case 'activity':
        return DONNEES_MOCK.activite[userId];
        
      case 'average-sessions':
        return DONNEES_MOCK["average-sessions"][userId];
        
      case 'performance':
        return DONNEES_MOCK.performance[userId];
        
      case 'user':
      default:
        return DONNEES_MOCK.utilisateurs[userId];
    }
  };
  
  export default getMockData;