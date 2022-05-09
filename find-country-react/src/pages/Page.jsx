import React, { useState, useMemo, useContext } from 'react';
import CountriesList from './CountriesList';
import SelectedCountry from './SelectedCountry';

const Page = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries);
  const [savedCountry, setSavedCountry] = useState(countries);
  const [mode, setMode] = useState('light');

  const list = useMemo(() => {
    return (
      <CountriesList
        countries={countries}
        onCountryChanged={(c) => setSelectedCountry(c)}
        savedCountry={savedCountry}
      />
    );
  }, [savedCountry, countries]);

  const selected = useMemo(() => {
    return (
      <SelectedCountry
        country={selectedCountry}
        onCountrySaved={() => setSavedCountry(selectedCountry)}
      />
    );
  }, [selectedCountry]);

  const theme = useMemo(() => ({ mode }), [mode]);
  return (
    <>
      <ThemeContext.Provider value={{ theme }}>
        <h1>Country settings</h1>
        {/* css={contentCss} */}
        <div>
          {list}
          {selected}
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default Page;
