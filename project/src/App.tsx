import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { SalesPage } from './pages/SalesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="estoque" element={<InventoryPage />} />
          <Route path="vendas" element={<SalesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;