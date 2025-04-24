
import React from 'react';
import { Utensils, Hotel } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-8 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Utensils size={24} className="text-accent" />
            <Hotel size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Gastro Kontakt Finder</h1>
            <p className="text-sm text-muted-foreground">
              Recherche-Tool für Gastronomie- und Hotelbetriebe
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
