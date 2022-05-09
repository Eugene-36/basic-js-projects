import React, { useState, useMemo, useContext } from 'react';
import { CountriesList } from './list';
import SelectedCountry from './SelectedCountry';
import { ThemeProvider, Mode } from './theme';

// import { css } from '@emotion/react';

const contentCss = `
  display: flex;
  width: 100%;
`;

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
      <ThemeProvider value={{ theme }}>
        <h1>Country settings</h1>
        {/* css={contentCss} */}
        <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          Toggle theme
        </button>
        <div>
          {list}
          {selected}
        </div>
      </ThemeProvider>
    </>
  );
};

export default Page;
