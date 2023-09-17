// useAuth.ts

import { useState, useEffect } from 'react'; 
import { apiCheckAuth } from '../api/api';

export const useAuth = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { isLogin } = await apiCheckAuth();
        
        if(isLogin) {
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
