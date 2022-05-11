// import { useTheme } from './theme';

// export const CountriesList = ({
//   countries,
//   onCountryChanged,
//   savedCountry,
// }) => {
//   const { mode } = useTheme();

//   const Item = ({ country }) => {
//     const className = `country-item ${
//       savedCountry.id === country.id ? 'saved' : ''
//     } ${mode === 'dark' ? 'dark' : ''}`;

//     console.log('country.flagUrl', country[0].flagUrl);
//     return (
//       <button className={className} onClick={() => onCountryChanged(country)}>
//         <img
//           src={country.flagUrl}
//           width={50}
//           style={{ marginRight: '8px' }}
//           alt={country.name}
//         />
//         <div>{country.name}</div>
//       </button>
//     );
//   };

//   return (
//     <div className='countries-list'>
//       {countries.map((country) => (
//         <Item country={country} key={country.id} />
//       ))}
//     </div>
//   );
// };

//=============
import { useTheme } from './theme';

const Item = ({ country, savedCountry, onItemClick }) => {
  const { mode } = useTheme();
  const className = `country-item ${
    savedCountry.id === country.id ? 'saved' : ''
  } ${mode === 'dark' ? 'dark' : ''}`;

  console.log('render', country[0]);

  return (
    <button className={className} onClick={onItemClick}>
      <img
        src={country.flagUrl}
        width={50}
        style={{ marginRight: '8px' }}
        alt={country.name}
      />
      <div>{country.name}</div>
    </button>
  );
};

export const CountriesList = ({
  countries,
  onCountryChanged,
  savedCountry,
}) => {
  return (
    <div className='countries-list'>
      {countries.map((country) => (
        <Item
          country={country}
          key={country.id}
          savedCountry={savedCountry}
          countries={countries}
          onItemClick={() => onCountryChanged(country)}
        />
      ))}
    </div>
  );
};
