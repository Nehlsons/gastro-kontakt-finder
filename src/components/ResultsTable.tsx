
import React, { useState } from 'react';
import { Business } from '@/lib/types';
import TableHeader from './table/TableHeader';
import BusinessTable from './table/BusinessTable';

interface ResultsTableProps {
  businesses: Business[];
  loading: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ businesses, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyWithEmail, setShowOnlyWithEmail] = useState(false);
  
  // Filter businesses based on search term and email filter
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (business.owner && business.owner.toLowerCase().includes(searchTerm.toLowerCase()));
      
    if (showOnlyWithEmail) {
      return matchesSearch && business.email;
    }
    return matchesSearch;
  });

  // Handle email action
  const handleEmailAction = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="space-y-4">
      <TableHeader 
        businesses={filteredBusinesses}
        filteredCount={filteredBusinesses.length}
        searchTerm={searchTerm}
        showOnlyWithEmail={showOnlyWithEmail}
        onSearchChange={setSearchTerm}
        onEmailFilterChange={setShowOnlyWithEmail}
      />

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-muted-foreground">Daten werden geladen...</p>
          </div>
        </div>
      ) : filteredBusinesses.length > 0 ? (
        <BusinessTable 
          businesses={filteredBusinesses}
          onEmailAction={handleEmailAction}
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <p className="text-muted-foreground">Keine Ergebnisse gefunden.</p>
          <p className="text-sm text-muted-foreground">
            Versuchen Sie es mit einem anderen Suchbegriff oder anderen Filterkriterien.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
