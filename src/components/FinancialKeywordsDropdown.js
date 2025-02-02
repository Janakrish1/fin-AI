import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './FinancialKeywordsDropdown.css';

const FinancialKeywordsDropdown = () => {
  const { t, i18n } = useTranslation();
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [resultData, setResultData] = useState(null); 
  const [loading, setLoading] = useState(false); // New 
  // loading state


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

  const fetchResultFromAPI = async () => {
    console.log("Waiting for ML model to process data...");
    
    try {
      setLoading(true); 
      // Wait a few seconds for the ML model to process the request
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
  
      // Second API call - Get processed results
      const resultResponse = await axios.post("https://b5f6-34-127-42-134.ngrok-free.app//process");
  
      console.log("Second API Response (Final Result):", resultResponse);
     
        setResultData(resultResponse.data.message); // Store first item in state
      
  
      // Handle the result as needed
    } catch (error) {
      console.error("Error fetching result from API:", error);
    }finally {
      setLoading(false); // Stop loading once the request is complete
    }
  };

  // Function to send keyword to API using Axios
  const sendKeywordToAPI = async (keyword) => {
    console.log(keyword)
    try {
      setLoading(true);
      const response = await axios.post("https://b5f6-34-127-42-134.ngrok-free.app/dropdownVal?keyword="+keyword);
      if (response.data) {
        await fetchResultFromAPI();
      } else {
        console.error("No data_id received in response.");
      } 
    } catch (error) {
      console.error('Error sending keyword to API:', error);
    }finally {
      setLoading(false); // Stop loading once the request is complete
    }
  };

  // Function to handle keyword selection
  const handleKeywordChange = async (event) => {
    const selected = event.target.value;
    setSelectedKeyword(selected);

    if (selected) {
      await sendKeywordToAPI(selected);
    }
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

      {/* Display Loading */}
      {loading && (
        <p className="loading-text">{t('Loading...')}</p> // Display "Loading..." message
      )}

      {/* Display Selected Keyword */}
      {selectedKeyword && (
        <p className="selected-text">
          {t('selected_keyword')}: {selectedKeyword}
        </p>
      )}
      {/* Display Processed Result */}
      {resultData && (
        <div className="result-box">
          <h3>Processed Keyword Result:</h3>
          {resultData.map((item, index) => (
      <div key={index} className="result-item">
        {item.source && (
          <p>
            <strong>{t('source')}:</strong> {item.source}
          </p>
        )}
        
        {item.pub_date && (
          <p>
            <strong>{t('published_date')}:</strong> {item.pub_date}
          </p>
        )}
        
        {item.title && item.link ? (
          <p>
            <strong>{t('title')}:</strong>{" "}
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="result-link"
            >
              {item.title}
            </a>
          </p>
        ) : (
          <p>{t('no_title_available')}</p>
        )}
      </div>
    ))}
        </div>
      )}
    </div>
  );
};

export default FinancialKeywordsDropdown;
