import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value?: string) => void;
  label?: string;
  error?: string;
}

export const CustomPhoneInput = ({ value, onChange, label, error }: PhoneInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-background/40 px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition",
          error && "border-destructive focus-within:ring-destructive"
        )}
      >
        <PhoneInput
          international
          defaultCountry="BJ"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none [&_.PhoneInputCountry]:mr-2 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-foreground"
        />
      </div>
      {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
    </div>
  );
};
