import "../../CSS/reviews.css";

const Reviews = () => {
  return (
    <>
      <h2 className="reviews-header">Reviews</h2>
      <div className="reviews-container">
        <div className="review">
          <div className="stars">★★★★☆</div>
          <p>"Great product, really loved it!"</p>
        </div>
        <div className="review">
          <div className="stars">★★★☆☆</div>
          <p>"Good, but could be better."</p>
        </div>
        <div className="review">
          <div className="stars">★★☆☆☆</div>
          <p>"It was okay, nothing special."</p>
        </div>
      </div>
    </>
  );
};

export default Reviews;
