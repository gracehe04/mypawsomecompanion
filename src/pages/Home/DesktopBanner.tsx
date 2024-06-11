import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { images } from '../../constants/index';

// Desktop banner component
const DesktopBanner = () => {
  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Create an array with selected images
  const selectedImages = [
    images.slide1,
    images.slide2,
    images.slide3,
  ];

  return (
    <SliderContainer>
      <Slider {...settings}>
        {selectedImages.map((image, index) => (
          <Slide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default DesktopBanner;

const SliderContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;

  .slick-list {
    width: 100%;
    height: 100%;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    padding: 0;
    height: 100%;
  }

  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slick-dots li button:before {
    color: #fff;
  }

  .slick-prev, .slick-next {
    color: #fff;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
