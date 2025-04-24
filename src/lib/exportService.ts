
import { Business } from "./types";
import { toast } from "@/components/ui/use-toast";

export const exportToExcel = async (businesses: Business[]): Promise<void> => {
  try {
    // In a real application, we would use a library like ExcelJS or SheetJS
    // to create an actual Excel file. For this demo, we'll create a CSV instead
    // which can be opened in Excel.

    // Create CSV headers
    const headers = [
      "Name",
      "Typ",
      "Adresse",
      "Inhaber/Geschäftsführer",
      "Info-E-Mail",
      "Website",
      "Generierte E-Mail 1",
      "Generierte E-Mail 2",
      "Generierte E-Mail 3",
      "Generierte E-Mail 4",
      "Generierte E-Mail 5",
      "Generierte E-Mail 6",
      "Quelle",
      "Letzte Aktualisierung"
    ];

    // Convert business data to CSV rows
    const rows = businesses.map(business => [
      business.name,
      business.type === "restaurant" ? "Restaurant" : "Hotel",
      business.address,
      business.owner || "",
      business.email || "",
      business.website || "",
      business.generatedEmails[0] || "",
      business.generatedEmails[1] || "",
      business.generatedEmails[2] || "",
      business.generatedEmails[3] || "",
      business.generatedEmails[4] || "",
      business.generatedEmails[5] || "",
      business.source,
      business.lastUpdated
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(";"),
      ...rows.map(row => row.join(";"))
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gastro-hotel-kontakte_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export erfolgreich",
      description: `${businesses.length} Einträge wurden erfolgreich exportiert.`,
    });
  } catch (error) {
    console.error("Export error:", error);
    toast({
      variant: "destructive",
      title: "Export fehlgeschlagen",
      description: "Beim Exportieren der Daten ist ein Fehler aufgetreten.",
    });
  }
};
