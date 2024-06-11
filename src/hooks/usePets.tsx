import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Pet {
  id: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        // Log the IDs to verify uniqueness
        console.log('Fetched pets with IDs:', petsWithIds);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { pets, loading, error };
};

export default usePets;