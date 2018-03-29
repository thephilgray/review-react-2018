import React from 'react';

const StarRating = props => {
  const { stars } = props;
  const starsList = () => {
    const str = [];
    for (let i = 0; i < stars; i++) {
      str.push(<span key={i}>*</span>);
    }
    return str;
  };
  return <div>{starsList()}</div>;
};

export default StarRating;
