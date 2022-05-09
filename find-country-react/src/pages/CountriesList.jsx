import React from 'react';

const CountriesList = ({ countries, onCountryChanged, savedCountry }) => {
  const Item = ({ country }) => {
    // const className =
    //   savedCountry.id === country.id ? 'country-item saved' : 'country-item';
    // const onItemClick = () => onCountryChanged(country);
    // return (
    //   <button className={className} onClick={onItemClick}>
    //     <img src={country.flagUrl} alt='' />
    //     <span>{country.name}</span>
    //   </button>
    // );
  };
  return (
    <div>
      {countries.map((country) => (
        <Item
          country={country}
          key={country.id}
          savedCountry={savedCountry}
          onItemClick={() => onCountryChanged(country)}
        />
      ))}
    </div>
  );
};

export default CountriesList;
