import "./RatingStars.css";

export function RatingStars({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="rating">
      <div className="rating-stars" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "#e2e8f0"}>
              <polygon points="12,2 15,9 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,9" />
            </svg>
          );
        })}
      </div>
      <span className="rating-num">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span className="rating-count">({reviewCount})</span>}
    </div>
  );
}
