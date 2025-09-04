import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ваш корневой компонент

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Не найден элемент с id='root'");
}