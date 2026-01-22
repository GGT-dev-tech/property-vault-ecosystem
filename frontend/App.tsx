import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { PropertyDetail } from './pages/PropertyDetail';
import { AddProperty } from './pages/AddProperty';
import { Billing } from './pages/Billing';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [detailId, setDetailId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string, id?: string) => {
    if (id) setDetailId(id);
    setCurrentPage(page);
    window.scrollTo(0,0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'inventory':
        return <Inventory onNavigate={handleNavigate} />;
      case 'detail':
        return <PropertyDetail id={detailId} onNavigate={handleNavigate} />;
      case 'add-property':
        return <AddProperty onNavigate={handleNavigate} />;
      case 'billing':
        return <Billing />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}
