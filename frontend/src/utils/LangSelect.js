import React from 'react';

function LangSelect({ onLangSelect }) {
  function handleChange(e) {
    onLangSelect(e.target.value);
  }

  return (
    <select id="LangSelect" onChange={handleChange}>
      <option value="en">English</option>
      <option value="ru">Russian</option>
      <option value="kz">French</option>
      <option value="ru">Kazakh</option>
    </select>
  );
}

export default LangSelect;