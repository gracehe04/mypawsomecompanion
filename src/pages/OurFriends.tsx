import React, { useState } from 'react';
import { motion } from 'framer-motion';
import usePets from '../hooks/usePets';
import styled from 'styled-components';

// interface for pet information
interface Pet {
    id: string;
    title: string;
    description: string;
    url: string;
    created: string;
}

// Our friends component
const OurFriends: React.FC = () => {
  const { pets, loading, error } = usePets();
  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedPets, setSelectedPets] = useState<Set<string>>(new Set());

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter pets based on the search input
  const filteredPets = pets.filter(pet =>
    pet.title.toLowerCase().includes(filter.toLowerCase()) ||
    pet.description.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort pets based on the sort order
  const sortedPets = filteredPets.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  // Toggle selection of a pet
  const toggleSelectPet = (id: string) => {
    setSelectedPets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Select all pets
  const selectAllPets = () => {
    const allPetIds = sortedPets.map(pet => pet.id);
    setSelectedPets(new Set(allPetIds));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedPets(new Set());
  };

  // Download selected pets
  const downloadSelectedPets = async () => {
    for (const id of selectedPets) {
      const pet = pets.find(pet => pet.id === id);
      if (pet) {
        try {
          const response = await fetch(pet.url);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${pet.title}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error(`Error downloading image for ${pet.title}`, error);
        }
      }
    }
  };

  return (
    <>
    <MotionDiv
    whileInView={{ x: [-100, 0], opacity: [0, 1] }}
    transition={{ duration: 1 }}
    >
      <h2 className='head-text'>
      Our Pawsome Friends
      </h2>
    </MotionDiv>

    <Container>
      <SearchBar
        type="text"
        placeholder="🐾 Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {/* Button container with required functions */}
      <ButtonContainer>
        <button onClick={() => setSortOrder('asc')}>Sort A-Z</button>
        <button onClick={() => setSortOrder('desc')}>Sort Z-A</button>
        <button onClick={selectAllPets}>Select All</button>
        <button onClick={clearSelection}>Clear Selection</button>
        <button onClick={downloadSelectedPets}>Download Selected</button>
      </ButtonContainer>
      {/* Grid displaying pet information */}
      <PetGrid>
        {sortedPets.map((pet) => (
          <PetCard key={pet.id} selected={selectedPets.has(pet.id)}>
            <img src={pet.url} alt={pet.title} />
            <h3>{pet.title}</h3>
            <p>{pet.description}</p>
            <p><small>{new Date(pet.created).toLocaleDateString()}</small></p>
            {/* Button to select and deselect pet card */}
            <button onClick={() => toggleSelectPet(pet.id)}>
              {selectedPets.has(pet.id) ? 'Deselect' : 'Select'}
            </button>
          </PetCard>
        ))}
      </PetGrid>
    </Container>
    </>
  );
};

export default OurFriends;

// Styled components

const MotionDiv = styled(motion.div)`
  padding-top: 8rem;
  margin: 2rem 1rem 0;

  h2 {
    font-size: 2rem;
    color: #CF529F; 
    margin: 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem; 
    }
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 600px;
  margin-bottom: 16px;
  border-radius: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #CF529F;
    outline: none;
    box-shadow: 0 0 5px #CF529F;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #fff;
    color: #CF529F;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
    border: 1px solid #ccc;

    &:hover {
      background-color: #FFF6FB;
      border-color: #CF529F;
    }

    @media screen and (min-width: 2000px) {
      padding: 1rem 2rem;
      border-radius: 0.5rem;
    }

    .item-active {
      background-color: #FFF6FB;
      border-color: #CF529F;
    }
  }
`;

const PetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const PetCard = styled.div<{ selected: boolean }>`
  border: 1px solid #ddd;
  gap: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* if selected */
  background-color: ${({ selected }) => (selected ? '#f0f8ff' : 'white')};
  box-shadow: ${({ selected }) => (selected ? '0 0 15px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.1)')};

  &:hover {
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 50%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 8px;
    object-fit: cover;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;

    @media screen and (min-width: 2000px) {
      height: 250px;
    }
  }

  h3 {
    margin: 4px 0 4px 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: #CF529F; 
  }

  p {
    margin: 4px 4px 0;
    font-size: 1rem;
    color: #555;
  }

  small {
    display: block;
    margin-top: 4px;
    font-size: 0.9rem;
    color: #888; 
  }
  
  button {
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    color: #CF529F;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
    border: 1px solid #ccc;
    
    &:hover {
      background-color: #FFF6FB;
      border-color: #CF529F;
    }

    @media screen and (min-width: 2000px) {
      padding: 1rem 2rem;
      border-radius: 0.5rem;
    }

    .item-active {
      background-color: #FFF6FB;
    }
  }
`;