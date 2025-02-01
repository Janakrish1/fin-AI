import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import translations from './translations';
import './FinancialKeywordsDropdown.css';

const FinancialKeywordsDropdown = () => {
  const { t, i18n } = useTranslation();
  const [selectedKeyword, setSelectedKeyword] = useState('');

  // Function to get translated options dynamically
  const getTranslatedOptions = (options) => {
    return options.map(option => ({
      original: option,
      translated: t(`dropdown_options.${option}`)
    }));
  };

  // Define keyword categories inside the component
  const keywordCategories = [
    {
      label: t('investment_keywords'),
      options: getTranslatedOptions([
        "Stock Market", "Mutual Funds", "ETF (Exchange-Traded Fund)", "Bonds", "Portfolio Management"
       
      ])
    },
    {
      label: t('loan_credit_keywords'),
      options: getTranslatedOptions([
        "Personal Loan", "Home Loan", "Car Loan", "Education Loan", "Credit Card",
        "EMI (Equated Monthly Installment)","Loan Repayment"
      ])
    },
    {
      label: t('payment_transactions'),
      options: getTranslatedOptions([
        "International Transfer"
      ])
    },
    {
      label: t('banking_services'),
      options: getTranslatedOptions([
        "KYC (Know Your Customer)", "Debit Card",
        "Cheque Deposit", "Stop Payment"
      ])
    }
  ];

  // Function to handle keyword selection
  const handleKeywordChange = (event) => {
    setSelectedKeyword(event.target.value);
  };

  // Function to handle language change
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="container">
        <h1 style={{
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "bold",
  fontSize: "2rem",
  color: "#333",
  textAlign: "center",
  textTransform: "uppercase",
  margin: "20px 0"
}}> Fin-AI</h1>
      <h1 className="title">{t('landing_page_title')}</h1>
      <p className="description">{t('landing_page_description')}</p>

      <div className="dropdown-wrapper">
        {/* Language Selector */}
        <label htmlFor="language-select" className="dropdown-label">
          {t('select_keyword')}
        </label>
        <select id="language-select" onChange={handleLanguageChange} className="dropdown language-selector">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="zh">中文</option>
        </select>

        {/* Financial Keywords Dropdown */}
        <label htmlFor="keyword-dropdown" className="dropdown-label">
          {t('select_placeholder')}
        </label>
        <select id="keyword-dropdown" value={selectedKeyword} onChange={handleKeywordChange} className="dropdown">
          <option value="">{t('select_placeholder')}</option>
          {keywordCategories.map((category, index) => (
            <optgroup key={index} label={category.label}>
              {category.options.map((option, idx) => (
                <option key={idx} value={option.original}>{option.translated}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Display Selected Keyword */}
      {selectedKeyword && (
        <p className="selected-text">
          {t('selected_keyword')}: {selectedKeyword}
        </p>
      )}
    </div>
  );
};

export default FinancialKeywordsDropdown;
