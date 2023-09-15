// useAuth.ts

import { useState, useEffect } from 'react'; 

export const useAuth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/isLogin', {
          credentials: 'include',
          method: 'GET'
        });
        
        const data = await response.json();
        
        if(data.isLogin) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);  
        }
        
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();

  }, []);

  return {
    isAuthenticated
  };

};
