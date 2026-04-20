import "./RatingStars.css";

export function RatingStars({ rating, reviewCount }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push("★");
    else if (i === full && half) stars.push("½");
    else stars.push("☆");
  }

  return (
    <div className="rating-stars">
      <span className="stars">{stars.join("")}</span>
      <span className="rating-num">{rating}</span>
      {reviewCount !== undefined && <span className="review-count">({reviewCount})</span>}
    </div>
  );
}
