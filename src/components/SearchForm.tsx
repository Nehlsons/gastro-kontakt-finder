
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { SearchParams, BusinessType } from '@/lib/types';

// Define the schema for form validation
const formSchema = z.object({
  location: z.string().min(1, {
    message: "Bitte geben Sie einen Ort oder eine PLZ ein.",
  }),
  restaurants: z.boolean().default(true),
  hotels: z.boolean().default(false),
  limit: z.number().int().min(1).max(500).default(100),
});

type FormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      restaurants: true,
      hotels: false,
      limit: 100,
    },
  });

  // Form submission handler
  const handleSubmit = (values: FormValues) => {
    // Convert form values to search parameters
    const businessTypes: BusinessType[] = [];
    if (values.restaurants) businessTypes.push("restaurant");
    if (values.hotels) businessTypes.push("hotel");

    if (businessTypes.length === 0) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte wählen Sie mindestens eine Kategorie aus.",
      });
      return;
    }

    // Call the onSearch prop with search parameters
    onSearch({
      location: values.location,
      types: businessTypes,
      limit: values.limit,
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stadt oder PLZ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="z.B. München oder 80331"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <FormField
                control={form.control}
                name="restaurants"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Restaurants</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hotels"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Hotels</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. Ergebnisse</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={500}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber)
                        }
                        value={field.value}
                        className="w-24"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suche läuft...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Suchen
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
