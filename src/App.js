import React, { Suspense, useState } from 'react';
import './i18n'; // Import i18n to enable translations
import FinancialKeywordsDropdown from './components/FinancialKeywordsDropdown';
import LinkCard from './components/LinkCard';
import { fetchLinks } from './services/api';

const App = () => {
  const [links, setLinks] = useState([]);

  const handleKeywordSelect = async (keyword) => {
    if (!keyword) return;

    try {
      const data = await fetchLinks(keyword);
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>Financial Keywords and Links</h1>
      <FinancialKeywordsDropdown onKeywordSelect={handleKeywordSelect} />
      <LinkCard links={links} />
    </Suspense>
  );
};

export default App;
