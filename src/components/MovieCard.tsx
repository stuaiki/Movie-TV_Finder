import React from "react";
import "../css/Home.css";
import hpImage from "../assets/Harry Potter 1.jpg";

export const MovieCard: React.FC = () => {
  return (
    <div className="card-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card">
          <img src={hpImage} alt="Movie Poster" />
          <div className="card-title">Harry Potter Sorcerer's Stone</div>
          <button className="favorite-btn">♥</button>
        </div>
      ))}
    </div>
  );
};
