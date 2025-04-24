
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import ResultsTable from '@/components/ResultsTable';
import { CrawlForm } from '@/components/CrawlForm';
import { Business, SearchParams } from '@/lib/types';
import { searchBusinesses } from '@/lib/mockData';

const Index = () => {
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchBusinesses(params);
      setBusinesses(results);
      
      toast({
        title: "Suche abgeschlossen",
        description: `Es wurden ${results.length} Einträge gefunden.`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        variant: "destructive",
        title: "Fehler bei der Suche",
        description: "Bei der Datenabfrage ist ein Fehler aufgetreten.",
      });
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pb-16">
        <div className="grid gap-8">
          <div className="max-w-2xl mx-auto w-full">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              Kontakte für Gastronomie und Hotellerie finden
            </h2>
            <p className="mb-6 text-muted-foreground">
              Geben Sie eine Website-URL ein, um nach Gastronomie- und Hotelleriekontakten zu suchen, 
              oder nutzen Sie die manuelle Suche unten.
            </p>

            <CrawlForm />
            
            <div className="mt-8 pt-8 border-t">
              <h3 className="mb-4 text-xl font-semibold">Manuelle Suche</h3>
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
          
          {(hasSearched || businesses.length > 0) && (
            <div className="mt-8">
              <ResultsTable businesses={businesses} loading={isLoading} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gastro Kontakt Finder - Alle Rechte vorbehalten
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
