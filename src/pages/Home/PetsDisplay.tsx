import React from 'react';
import styled from 'styled-components';
import usePets from '../../hooks/usePets'; 
import { Link } from 'react-router-dom';

// Pets section component
const PetsSection: React.FC = () => {
  // Fetching pet information
  const { pets, loading, error } = usePets();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PetsContainer>
      <Info>Pets Available for Adoption</Info>
      <PetsGrid>
        {pets.slice(0, 5).map((pet) => ( 
          <StyledLink to='/ourfriends' key={pet.id}> {/* Wrapping PetCard with Link to /ourfriends */}
            <PetCard>
              <PetImage src={pet.url} alt={pet.title} />
              <PetName>{pet.title}</PetName>
            </PetCard>
          </StyledLink>
        ))}
      </PetsGrid>
      <ShowMore>
        <StyledLink to="/ourfriends">Show More</StyledLink>
      </ShowMore>
    </PetsContainer>
  );
};

// Styled components

export default PetsSection;

const PetsContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  color: #cf529f;
  text-decoration: none;
  display: inline-block; 
  width: 150px; 
  margin: 5px; 
  &:hover {
    text-decoration: underline;
  }
`;

const PetsGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const PetCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; 
  text-align: center;
`;

const PetImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const PetName = styled.p`
  color: #333;
  margin-top: 10px;
  font-weight: bold;
`;

const Info = styled.span`
  font-size: 1rem;
  color: #3b3b3b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: italic;
`;

const ShowMore = styled.h2`
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 20px;
`;