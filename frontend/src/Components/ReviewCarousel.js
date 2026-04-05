import React, { useState, useEffect } from 'react';
import './ReviewCarousel.css'; // Importing the CSS file for carousel styling

const reviews = [
  {
    name: 'Jane Doe',
    content: 'This product is amazing! It exceeded my expectations and I couldn\'t be happier'
  },
  {
    name: 'John Smith',
    content: 'Great quality and fantastic customer service. Highly recommend!'
  },
  {
    name: 'Emily Johnson',
    content: 'I am very satisfied with my purchase. Will definitely buy again'
  },
  {
    name: 'Michael Brown',
    content: 'Good value for money. The product works as described.'
  },
  {
    name: 'Sarah Wilson',
    content: 'Quick delivery and the products are top-notch. Five stars!'
  },
  {
    name: 'David Lee',
    content: 'Excellent quality and fast shipping. Highly satisfied'
  }
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3; // Number of cards visible in one slide
  const totalCards = reviews.length;

  useEffect(() => {
    // Add 'active' class to the initial middle card
    const initialMiddleIndex = Math.floor(visibleCards / 2);
    const middleCard = document.querySelectorAll('.review-card')[initialMiddleIndex];
    if (middleCard) middleCard.classList.add('active');
  }, []);

  const moveCarousel = (direction) => {
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = totalCards - 1; // Wrap around to the last card
    } else if (newIndex >= totalCards) {
      newIndex = 0; // Wrap around to the first card
    }

    setCurrentIndex(newIndex);
    const middleIndex = newIndex + Math.floor(visibleCards / 2);
    const middleCardIndex = middleIndex % totalCards;

    // Remove 'active' class from all cards
    document.querySelectorAll('.review-card').forEach(card => card.classList.remove('active'));

    // Add 'active' class to the new middle card
    const middleCard = document.querySelectorAll('.review-card')[middleCardIndex];
    if (middleCard) middleCard.classList.add('active');
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button left-button" onClick={() => moveCarousel(-1)}>&#10094;</button>
      <div className="review-section" style={{ transform: `translateX(${-currentIndex * 390}px)` }}>
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-content">
              <h3 className='review-name'>{review.name}</h3>
              <p className='paragraph-review'>"{review.content}"</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-button right-button" onClick={() => moveCarousel(1)}>&#10095;</button>
    </div>
  );
};

export default ReviewCarousel;
