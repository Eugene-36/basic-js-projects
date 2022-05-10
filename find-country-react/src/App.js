import './App.css';
import Page from './pages/Page';
import { rawCountries } from './raw-data.js';

const getCountriesFromRawData = (raw) => {
  return raw.map(() => {
    return raw.map((value) => ({
      __typename: 'country',
      name: value.name.common,
      id: value.cca2.toLowerCase(),
      independent: value.independent,
      unMember: value.unMember,
      flagUrl: `https://flagcdn.com/${value.cca2.toLowerCase()}.svg`,
      region: value.region,
      capital: value.capital.length ? String(value.capital[0]) : '',
      subregion: value.subregion,
    }));
  });
};

function App() {
  return (
    <div className='App'>
      <Page countries={getCountriesFromRawData(rawCountries)} />
    </div>
  );
}

export default App;
