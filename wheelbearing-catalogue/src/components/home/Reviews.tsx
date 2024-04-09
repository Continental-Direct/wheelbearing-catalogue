import "../../CSS/reviews.css";

const Reviews = () => {
  return (
    <>
      <h2 className="reviews-header">REVIEWS</h2>
      <div className="reviews-container">
        <div className="review">
          <div className="stars">★★★★★</div>
          <p>Josh Quinn:</p>
          <p>"Nice people. good service"</p>
        </div>
        <div className="review">
          <div className="stars">★★★★★</div>
          <p>AI Laurence:</p>
          <p>
            "Brilliant Company, I brought strut mounts and shock absorbers and
            they are excellent quality."
          </p>
        </div>
        <div className="review">
          <div className="stars">★★★★★</div>
          <p>Alfie Dobb</p>
        </div>
      </div>
    </>
  );
};

export default Reviews;
