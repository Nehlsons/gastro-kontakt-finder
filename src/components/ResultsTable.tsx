
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Business } from '@/lib/types';
import { 
  MoreHorizontal, 
  Copy, 
  ExternalLink, 
  Mail
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { exportToExcel } from '@/lib/exportService';

interface ResultsTableProps {
  businesses: Business[];
  loading: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ businesses, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter businesses based on search term
  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (business.owner && business.owner.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Copy to clipboard function
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "In Zwischenablage kopiert",
        description: `${label} wurde in die Zwischenablage kopiert.`,
      });
    }).catch(err => {
      toast({
        variant: "destructive",
        title: "Kopieren fehlgeschlagen",
        description: "Konnte nicht in die Zwischenablage kopieren.",
      });
    });
  };
  
  // Export function
  const handleExport = () => {
    if (filteredBusinesses.length > 0) {
      exportToExcel(filteredBusinesses);
    } else {
      toast({
        variant: "destructive",
        title: "Export fehlgeschlagen",
        description: "Keine Daten zum Exportieren vorhanden.",
      });
    }
  };
  
  // Handle email action
  const handleEmailAction = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Suchergebnisse</h2>
          <p className="text-sm text-muted-foreground">
            {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Eintrag' : 'Einträge'} gefunden
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[250px]"
          />
          <Button onClick={handleExport} disabled={filteredBusinesses.length === 0}>
            Exportieren
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-muted-foreground">Daten werden geladen...</p>
          </div>
        </div>
      ) : filteredBusinesses.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableCaption>Eine Liste der gefundenen Gastronomiebetriebe und Hotels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead className="w-[100px]">Typ</TableHead>
                <TableHead className="hidden md:table-cell">Adresse</TableHead>
                <TableHead className="hidden lg:table-cell">Inhaber</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={business.type === "hotel" ? "bg-blue-50" : "bg-amber-50"}>
                      {business.type === "hotel" ? "Hotel" : "Restaurant"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{business.address}</TableCell>
                  <TableCell className="hidden lg:table-cell">{business.owner || "—"}</TableCell>
                  <TableCell>
                    {business.email ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEmailAction(business.email as string)}
                        className="px-2"
                      >
                        <Mail size={16} className="mr-1" />
                        <span className="truncate max-w-[120px] block">{business.email}</span>
                      </Button>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Menü öffnen</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => copyToClipboard(business.name, "Name")}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Namen kopieren</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyToClipboard(business.address, "Adresse")}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Adresse kopieren</span>
                        </DropdownMenuItem>
                        {business.website && (
                          <DropdownMenuItem onClick={() => window.open(business.website, "_blank")}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Website öffnen</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>E-Mails</DropdownMenuLabel>
                        {business.generatedEmails.map((email, index) => (
                          <DropdownMenuItem key={index} onClick={() => copyToClipboard(email, "E-Mail")}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span className="truncate">{email}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
