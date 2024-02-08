import React from "react";
import Card from "./components/card";
import { CardProps } from "./components/card";
import { useLocation } from "react-router-dom";

interface CardContainerProps {
  cardsData: CardProps[];
}

const CardContainer: React.FC<CardContainerProps> = () => {
  const location = useLocation();
  const { searchResults } = (location.state as {
    searchResults: CardProps[];
  }) || { searchResults: [] };
  return (
    <div className="card-container">
      {searchResults.map((data, index) => (
        <Card key={index} {...data} />
      ))}
    </div>
  );
};

export default CardContainer;
