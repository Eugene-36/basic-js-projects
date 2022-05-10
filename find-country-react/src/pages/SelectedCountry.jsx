const SelectedCountry = ({ country, onCountrySaved }) => {
  console.log('country', country);
  return (
    <div className='selected-container'>
      <div className='selected-info'>
        <ul>
          <li>Country: {country.name}</li>
          <li>Capital: {country.capital}</li>
          <li>Region: {country.region}</li>
          <li>Subregion: {country.subregion}</li>
        </ul>
        <button
          className='selected-button'
          onClick={onCountrySaved}
          type='button'
        >
          Save
        </button>
      </div>
      <img src={country.flagUrl} className='selected-flag' alt={country.name} />
    </div>
  );
};
export default SelectedCountry;
