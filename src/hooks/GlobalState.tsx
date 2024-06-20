import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Pet interface
interface Pet {
  id: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

// Structure of the global state
interface GlobalState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

// Global state update functions
interface GlobalStateUpdate {
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// Contexts for global state and update functions
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
const GlobalStateUpdateContext = createContext<GlobalStateUpdate | undefined>(undefined);

// Hook to access global state
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

// Hook to access update functions
export const useSetGlobalState = (): GlobalStateUpdate => {
  const context = useContext(GlobalStateUpdateContext);
  if (!context) {
    throw new Error('useSetGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

// Wraps the application and provides the global state
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the list of pets
  useEffect(() => {
    fetch('https://eulerity-hackathon.appspot.com/pets')
      .then(response => response.json())
      .then(data => {
        const petsWithIds = data.map((pet: any) => ({
          ...pet,
          id: pet.id || uuidv4(), // Generate a unique ID for each pet if not provided
        }));
        setPets(petsWithIds);
        setLoading(false);
        console.log('Fetched pets with IDs:', petsWithIds);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

// Provide the global state and the update functions to the children components
  return (
    <GlobalStateContext.Provider value={{ pets, loading, error }}>
      <GlobalStateUpdateContext.Provider value={{ setPets, setLoading, setError }}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
};
