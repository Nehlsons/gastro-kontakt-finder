
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, FilterX } from 'lucide-react';
import { exportToExcel } from '@/lib/exportService';
import { Business } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface TableHeaderProps {
  businesses: Business[];
  filteredCount: number;
  searchTerm: string;
  showOnlyWithEmail: boolean;
  onSearchChange: (value: string) => void;
  onEmailFilterChange: (checked: boolean) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  businesses,
  filteredCount,
  searchTerm,
  showOnlyWithEmail,
  onSearchChange,
  onEmailFilterChange,
}) => {
  const handleExport = () => {
    if (businesses.length > 0) {
      exportToExcel(businesses);
    } else {
      toast({
        variant: "destructive",
        title: "Export fehlgeschlagen",
        description: "Keine Daten zum Exportieren vorhanden.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold">Suchergebnisse</h2>
        <p className="text-sm text-muted-foreground">
          {filteredCount} {filteredCount === 1 ? 'Eintrag' : 'Einträge'} gefunden
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="emailFilter"
            checked={showOnlyWithEmail}
            onCheckedChange={(checked) => onEmailFilterChange(checked as boolean)}
          />
          <label
            htmlFor="emailFilter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
          >
            {showOnlyWithEmail ? <FilterX className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            Nur mit E-Mail
          </label>
        </div>
        <Input
          placeholder="Suchen..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-[250px]"
        />
        <Button onClick={handleExport} disabled={businesses.length === 0}>
          Exportieren
        </Button>
      </div>
    </div>
  );
};

export default TableHeader;
