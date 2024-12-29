import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";
import { Input } from "@/components/UI/input";

const countryCodes = [
  { code: "+44", name: "United Kingdom" },
  { code: "+1", name: "United States" },
  { code: "+353", name: "Ireland" },
  { code: "+91", name: "India" },
  { code: "+61", name: "Australia" },
  // Add more as needed
];

interface PhoneNumberInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

const PhoneNumberInput = ({ 
  countryCode, 
  phoneNumber, 
  onCountryCodeChange, 
  onPhoneNumberChange 
}: PhoneNumberInputProps) => {
  return (
    <div className="flex gap-2">
      <Select value={countryCode} onValueChange={onCountryCodeChange}>
        <SelectTrigger className="w-[80px] bg-white/10 border-white/20 text-white">
          <SelectValue>{countryCode}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((country) => (
            <SelectItem 
              key={country.code} 
              value={country.code}
              className="flex items-center justify-between"
            >
              <span>{country.name}</span>
              <span className="text-muted-foreground">{country.code}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
    </div>
  );
};

export default PhoneNumberInput; 