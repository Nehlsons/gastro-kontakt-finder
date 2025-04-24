
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
import { Business } from '@/lib/types';
import { exportToExcel } from '@/lib/exportService';
import { toast } from '@/components/ui/use-toast';

interface ExportButtonProps extends ButtonProps {
  businesses: Business[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ businesses, ...props }) => {
  const handleExport = () => {
    if (businesses.length > 0) {
      exportToExcel(businesses);
    } else {
      toast({
        variant: "destructive",
        title: "Export fehlgeschlagen",
        description: "Keine Daten zum Exportieren verfügbar.",
      });
    }
  };

  return (
    <Button onClick={handleExport} disabled={businesses.length === 0} {...props}>
      <FileSpreadsheet className="mr-2 h-4 w-4" />
      Als Excel exportieren
    </Button>
  );
};

export default ExportButton;
