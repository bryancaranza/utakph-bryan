import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  isError?: boolean;
  errorMsg?: any;
  type?: string;
  subLabel?: string;
  labelOption?: string;
}

const CustomInput = ({
  onChange,
  placeholder,
  label,
  isError,
  errorMsg,
  type,
  subLabel,
  labelOption,
  ...rest
}: Props) => {
  const errorLabel = () => {
    if (errorMsg.type !== "too_small") {
      if (errorMsg.message.includes("Expected number")) return "Invalid input";
      return errorMsg.message;
    }
    return "";
  };

  return (
    <div className="flex flex-col space-y-1.5 mb-2 px-1">
      <div className="flex h-[20px] justify-between items-center">
        <div className="flex items-center gap-1">
          <Label htmlFor="name">{label}</Label>
          {labelOption ? (
            <Label className="text-gray-500 italic">({labelOption})</Label>
          ) : null}
        </div>
        {isError && (
          <Label className="text-red-700 italic text-[12px]">
            {errorMsg.type === "too_small" ? "Required" : ""}*
          </Label>
        )}
      </div>

      {subLabel ? (
        <p className="text-sm text-gray-600 italic">{subLabel}</p>
      ) : null}
      <Input
        className={`${isError && "!border-red-700 border-2"}`}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...rest}
      />
      <div className="flex justify-end">
        {isError && (
          <Label className="text-red-700 italic text-[12px]">
            {errorLabel()}
          </Label>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
