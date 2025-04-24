
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Business } from '@/lib/types';
import { MoreHorizontal, Copy, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BusinessActionsProps {
  business: Business;
}

const BusinessActions: React.FC<BusinessActionsProps> = ({ business }) => {
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

  return (
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
  );
};

export default BusinessActions;
