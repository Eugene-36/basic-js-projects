/** @jsxImportSource @emotion/react */
import { useState, useMemo } from 'react';
// import { css } from '@emotion/react';
// import { Country } from './types';
import { SelectedCountry } from './SelectedCountry';
import { CountriesList } from './list';
import { ThemeProvider, Mode } from './theme';

export const Page = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [savedCountry, setSavedCountry] = useState(countries[0]);
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
    <ThemeProvider value={theme}>
      <h1>Country settings</h1>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
      <div style={{ display: 'flex', width: '100%' }}>
        {list}
        {selected}
      </div>
    </ThemeProvider>
  );
};
