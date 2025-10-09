import { useState, useEffect } from 'react';
import getMockData from '../service/MockApi';

const useFetch = (id, type, mode) => {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    
    const chargerDonnees = async () => {
      
      try {
        
        // VÉRIFIER SI LE MODE EST VALIDE
        if (mode !== 'mock' && mode !== 'api') {
          setError(`Mode invalide : "${mode}". Utilisez "mock" ou "api"`);
          setData(null);
          setLoading(false);
          return;
        }
        
        // VÉRIFIER SI L'ID EST VALIDE
        if (id !== '12' && id !== '18') {
          setError(`Utilisateur ${id} introuvable. Les utilisateurs disponibles sont 12 et 18`);
          setData(null);
          setLoading(false);
          return;
        }
        
        // SI on est en mode Mock
        if (mode === 'mock') {
          const mockData = getMockData(id, type);
          
          if (!mockData) {
            setError("Aucune donnée disponible pour cet utilisateur");
            setData(null);
            setLoading(false);
            return;
          }
          
          setData(mockData);
          setError(null);
          setLoading(false);
        } 
        
        // SI on est en mode API
        else if (mode === 'api') {
          
          let url = `http://localhost:3000/user/${id}`;
          
          if (type !== 'user') {
            url += `/${type}`;
          }
          
          const reponse = await fetch(url);
          
          if (!reponse.ok) {
            if (reponse.status === 404) {
              setError("Utilisateur introuvable");
            } else {
              setError(`Erreur serveur (${reponse.status})`);
            }
            setData(null);
            setLoading(false);
            return;
          }
          
          const resultat = await reponse.json();
          
          if (!resultat || !resultat.data) {
            setError("Aucune donnée disponible");
            setData(null);
            setLoading(false);
            return;
          }
          
          setData(resultat.data);
          setError(null);
          setLoading(false);
        }
        
      } catch (erreur) {
        
        if (erreur.message === 'Failed to fetch' || erreur.message.includes('NetworkError')) {
          setError("Impossible de se connecter au serveur. Vérifiez que l'API est démarrée sur http://localhost:3000");
        } else {
          setError(erreur.message);
        }
        
        setData(null);
        setLoading(false);
      }
    };
    
    chargerDonnees();
    
  }, [id, type, mode]);
  
  return { data, loading, error };
};

export default useFetch;