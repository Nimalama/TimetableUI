import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface CarouselItem {
  coursePic: string;
  title: string;
  description: string;
}

interface Props {
  items: CarouselItem[];
}

const Carousel: React.FC<Props> = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000 // Adjust autoplay speed in milliseconds
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          <img src={item.coursePic} alt={item.title} />
          <div className="carousel-caption">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
