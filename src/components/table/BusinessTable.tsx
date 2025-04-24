
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import { Business } from '@/lib/types';
import BusinessActions from './BusinessActions';

interface BusinessTableProps {
  businesses: Business[];
  onEmailAction: (email: string) => void;
}

const BusinessTable: React.FC<BusinessTableProps> = ({ businesses, onEmailAction }) => {
  return (
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
          {businesses.map((business) => (
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
                    onClick={() => onEmailAction(business.email as string)}
                    className="px-2"
                  >
                    <Mail size={16} className="mr-1" />
                    <span className="truncate max-w-[120px] block">{business.email}</span>
                  </Button>
                ) : "—"}
              </TableCell>
              <TableCell className="text-right">
                <BusinessActions business={business} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BusinessTable;
