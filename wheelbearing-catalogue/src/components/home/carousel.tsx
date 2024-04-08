import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// This is the array the component will use directly
const images: string[] = ["/CD-WBK-4.jpg", "/CD-WBK-2.jpg", "/CD-WBK-5.jpg"];

// Removed the images prop from the interface, as it's no longer needed
interface ImageSliderProps {}

const ImageSlider: React.FC<ImageSliderProps> = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((url, index) => (
        <div key={index}>
          <img
            src={url}
            alt={`Slide ${index}`}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
