import React from 'react';
import styled from 'styled-components';
import { FaHome, FaHeart, FaDog }from 'react-icons/fa';

// interface for pet information
interface Items {
    title: string;
    description: string;
    icon: JSX.Element;
}

const items: Items[] = [
    {
        title: 'Our Mission',
        description: 'Our mission is to find the perfect home for each animal in our care.',
        icon: <FaHome />
    },
    {
        title: 'Community Support',
        description: 'We work closely with local shelters and rescue groups to ensure every pet has a chance for a happy life.',
        icon: <FaHeart />
    },
    {
        title: 'Volunteer with Us',
        description: 'Your love and support can make a huge difference in the lives of our furry friends. Learn how you can get involved today!',
        icon: <FaDog />
    }
]

// Information component

const Information: React.FC = () => {
    return (
      <Section>
        <Title>Who We Are</Title>
        <ItemContainer>
          {items.map((item, index) => (
            <Item key={index}>
              <Icon>{item.icon}</Icon>
              <ItemTitle>{item.title}</ItemTitle>
              <Description>{item.description}</Description>
            </Item>
          ))}
        </ItemContainer>
      </Section>
    );
  };

export default Information;

// Styled components

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f7f7f7;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #cf529f;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Item = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #cf529f;
`;

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #cf529f;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #666;
`;