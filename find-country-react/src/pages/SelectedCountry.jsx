import React from 'react';

const SelectedCountry = ({ country, onCountrySaved }) => {
  return (
    <>
      <ul>
        <li>Country: {country.name}</li>
      </ul>

      <button onClick={onCountrySaved} type='button'>
        Save
      </button>
    </>
  );
};

export default SelectedCountry;
