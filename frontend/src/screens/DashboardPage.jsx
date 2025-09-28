import React, { useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, chickens, observations, onLogout, onCreateChicken, onCreateObservation, isLoading }) => {
  const [newChickenName, setNewChickenName] = useState('');
  const [newChickenBreed, setNewChickenBreed] = useState('Lunar Leghorn');
  
  const [newObservationTitle, setNewObservationTitle] = useState('');
  const [selectedChickenId, setSelectedChickenId] = useState('');

  const handleAddChicken = (e) => {
    e.preventDefault();
    if (!newChickenName) return;
    onCreateChicken({ name: newChickenName, breed: newChickenBreed, eggLayingRate: 0, featherColor: 'White' });
    setNewChickenName('');
  };
  
  const handleAddObservation = (e) => {
    e.preventDefault();
    if (!newObservationTitle || !selectedChickenId) return;
    onCreateObservation({ 
      title: newObservationTitle, 
      chickenId: parseInt(selectedChickenId), 
      details: 'Initial observation notes...',
      observationDate: new Date().toISOString(),
      gravityReading: 1.62
    });
    setNewObservationTitle('');
    setSelectedChickenId('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lunar Observations Dashboard</h1>
            <p className="text-gray-500">Welcome back, Dr. {user.name.split(' ')[0]}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600">Admin Panel</a>
            <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Chickens List & Forms */}
          <div className="lg:col-span-1 space-y-6">
              {/* Add Chicken Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Register New Chicken</h2>
                  <form onSubmit={handleAddChicken} className="space-y-4">
                      <input type="text" placeholder="Chicken's Name (e.g., Henrietta)" value={newChickenName} onChange={e => setNewChickenName(e.target.value)} className="w-full p-2 border rounded-md" required />
                      <select value={newChickenBreed} onChange={e => setNewChickenBreed(e.target.value)} className="w-full p-2 border rounded-md bg-white">
                          <option>Lunar Leghorn</option>
                          <option>Cosmic Cochin</option>
                          <option>Galactic Gamefowl</option>
                          <option>Meteor Minorca</option>
                      </select>
                      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">Add Chicken</button>
                  </form>
              </div>
              
              {/* Add Observation Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Log New Observation</h2>
                  <form onSubmit={handleAddObservation} className="space-y-4">
                      <input type="text" placeholder="Observation Title" value={newObservationTitle} onChange={e => setNewObservationTitle(e.target.value)} className="w-full p-2 border rounded-md" required />
                      <select value={selectedChickenId} onChange={e => setSelectedChickenId(e.target.value)} className="w-full p-2 border rounded-md bg-white" required>
                          <option value="">Select a Chicken</option>
                          {chickens.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <button type="submit" className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700">Log Observation</button>
                  </form>
              </div>
          </div>

          {/* Right Column: Observations List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Chicken & Observation Records</h2>
            {isLoading ? <p>Loading data...</p> : (
                <div className="space-y-6">
                {chickens.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No chickens registered yet. Add your first chicken to begin.</p>
                ) : (
                    chickens.map(chicken => (
                        <div key={chicken.id} className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-700">{chicken.name} <span className="font-normal text-gray-500 text-sm">({chicken.breed})</span></h3>
                            <ul className="mt-2 space-y-2 pl-4 list-disc list-inside text-gray-700">
                                {observations.filter(o => o.chickenId === chicken.id).length > 0 ? (
                                    observations.filter(o => o.chickenId === chicken.id).map(obs => (
                                        <li key={obs.id}>{obs.title} - <span className="text-xs text-gray-500">{new Date(obs.observationDate).toLocaleDateString()}</span></li>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 italic pl-0">No observations for this chicken yet.</p>
                                )}
                            </ul>
                        </div>
                    ))
                )}
                </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
