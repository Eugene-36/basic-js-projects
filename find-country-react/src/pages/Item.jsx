import React from 'react';

const Item = ({ country, savedCountry, onItemClick }) => {
  // const className =
  //   savedCountry.id === country.id ? 'country-item saved' : 'country-item';
  // const onItemClick = () => onCountryChanged(country);
  const { mode } = useTheme();
  const className = `country-item ${mode === 'dark' ? 'dark' : ''}`;
  return (
    <button className={className} onClick={onItemClick}>
      <img src={country.flagUrl} alt='' />
      <span>{country.name}</span>
    </button>
  );
};

export default Item;
