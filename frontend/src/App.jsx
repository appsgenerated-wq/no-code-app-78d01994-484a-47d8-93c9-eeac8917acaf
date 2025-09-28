import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [chickens, setChickens] = useState([]);
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Initializing application...');
      setIsLoading(true);
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          console.log('✅ [APP] User is logged in:', currentUser.email);
          await loadData(currentUser.id);
        } catch (error) {
          setUser(null);
          console.log('ℹ️ [APP] No active user session.');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
    await manifest.login(email, password);
    const currentUser = await manifest.from('User').me();
    setUser(currentUser);
    await loadData(currentUser.id);
  };
  
  const signup = async (name, email, password) => {
    await manifest.from('User').signup({ name, email, password });
    await login(email, password);
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setChickens([]);
    setObservations([]);
  };

  const loadData = async (userId) => {
    setIsLoading(true);
    try {
      const chickensResponse = await manifest.from('Chicken').find({ include: ['observer'], filter: { observerId: userId } });
      const observationsResponse = await manifest.from('Observation').find({ include: ['scientist', 'chicken'], filter: { scientistId: userId } });
      setChickens(chickensResponse.data);
      setObservations(observationsResponse.data);
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleCreateChicken = async (chickenData) => {
    try {
        const newChicken = await manifest.from('Chicken').create(chickenData);
        setChickens([newChicken, ...chickens]);
    } catch(error) {
        console.error('Failed to create chicken:', error);
        alert('Error: Could not create chicken. Check console for details.');
    }
  };

  const handleCreateObservation = async (observationData) => {
    try {
        const newObservation = await manifest.from('Observation').create(observationData);
        setObservations([newObservation, ...observations]);
    } catch(error) {
        console.error('Failed to create observation:', error);
        alert('Error: Could not create observation. Check console for details.');
    }
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading Lunar Observations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs font-medium text-gray-700">{backendConnected ? 'API Connected' : 'API Disconnected'}</span>
        </div>

      {user ? (
        <DashboardPage 
          user={user} 
          chickens={chickens} 
          observations={observations}
          onLogout={logout}
          onCreateChicken={handleCreateChicken}
          onCreateObservation={handleCreateObservation}
          isLoading={isLoading}
        />
      ) : (
        <LandingPage onLogin={login} onSignup={signup} />
      )}
    </div>
  );
}

export default App;
