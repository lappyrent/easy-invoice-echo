
import { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";

// Common currency options
const CURRENCIES = [
  { code: "USD", name: "US Dollar (USD)", symbol: "$" },
  { code: "EUR", name: "Euro (EUR)", symbol: "€" },
  { code: "GBP", name: "British Pound (GBP)", symbol: "£" },
  { code: "JPY", name: "Japanese Yen (JPY)", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar (CAD)", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar (AUD)", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc (CHF)", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan (CNY)", symbol: "¥" },
  { code: "INR", name: "Indian Rupee (INR)", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real (BRL)", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble (RUB)", symbol: "₽" },
  { code: "KRW", name: "South Korean Won (KRW)", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar (SGD)", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar (NZD)", symbol: "NZ$" },
  { code: "MXN", name: "Mexican Peso (MXN)", symbol: "$" }
];

interface CurrencySelectorProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  onCurrencyChange?: (currency: string) => void;
}

const CurrencySelector = ({ 
  form, 
  name, 
  label = "Currency", 
  onCurrencyChange 
}: CurrencySelectorProps) => {
  
  // Get the currently selected currency
  const selectedCurrency = form.watch(name);
  
  // Effect hook to call the onCurrencyChange callback when the currency changes
  useEffect(() => {
    if (onCurrencyChange && selectedCurrency) {
      onCurrencyChange(selectedCurrency);
    }
  }, [selectedCurrency, onCurrencyChange]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.name} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  return currency ? currency.symbol : "$";
};

export { CurrencySelector, CURRENCIES };
