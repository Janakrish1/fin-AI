import React, { Suspense } from 'react';
import FinancialKeywordsDropdown from './FinancialKeywordsDropdown';
import './i18n'; // Import i18n to enable translations

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinancialKeywordsDropdown />
    </Suspense>
  );
};

export default App;
