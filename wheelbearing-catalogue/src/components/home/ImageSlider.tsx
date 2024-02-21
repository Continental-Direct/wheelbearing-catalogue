// import React, { useState } from "react";

// // Define a type for the props
// interface ImageSliderProps {
//   slides: string[]; // Array of image URLs
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   const goToPrevious = (): void => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = (): void => {
//     const isLastSlide = currentIndex === slides.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className="slider-container">
//       <div className="slider-wrapper">
//         {slides.map((slide, index) => (
//           <div
//             className={`slide ${index === currentIndex ? "active" : ""}`}
//             key={index}
//           >
//             <img
//               src={`${process.env.PUBLIC_URL}/${slide}`}
//               alt={`Slide ${index}`}
//               className="slider-image"
//             />
//           </div>
//         ))}
//       </div>
//       <button className="left-arrow" onClick={goToPrevious}>
//         &lt;
//       </button>
//       <button className="right-arrow" onClick={goToNext}>
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;
