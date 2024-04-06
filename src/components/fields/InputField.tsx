import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  mode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
  label?: string;
  id?: string;
  extra?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  variant?: string;
  disabled?: boolean;
  accept?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  mode,
  label,
  id,
  extra,
  value,
  type,
  placeholder,
  variant,
  disabled,
  accept,
  readOnly,
  onChange
}) => {
  return (
    <div className={`${extra == null ? "" : extra}`}>
      {label && (
        <label
          htmlFor={id}
          className={` font-normal text-sm text-primary-700/70  ${variant === "auth" ? "ml-1.5 font-medium" : "ml-1.5 font-bold"
            }`}
        >
          {label}
        </label>
      )}
      <input
        inputMode={`${mode || "text" || null}`}
        autoComplete="off"
        value={value}
        disabled={disabled}
        type={type}
        id={id}
        name={id}
        accept={accept}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        className={`focus:ring-0 mt-0 flex w-full border-none bg-primary-100/50 text-black-600 items-center justify-center rounded-2xl p-4 text-sm outline-none`
        }
      />
    </div>
  );
};

export default InputField;
