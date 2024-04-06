import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  label?: string;
  id?: string;
  extra?: string;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  rows: number; // Asegúrate de que rows sea de tipo number
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextArea: FC<InputFieldProps> = ({
  label,
  id,
  extra,
  value,
  placeholder,
  disabled,
  rows,
  onChange
}) => {
  return (
    <div className={`${extra}`}>
      {label && (
        <label
          htmlFor={id}
          className={`font-normal text-sm text-primary-700/70 ml-2`}
        >
          {label}
        </label>
      )}
      <textarea
      autoComplete="off"
        value={value}
        disabled={disabled}
        id={id}
        name={id}
        placeholder={placeholder}
        className={"focus:ring-0 bg-primary-100/50 text-black-600 mt-0 flex w-full border-none   items-center justify-center rounded-2xl p-4 text-sm outline-none"}
        rows={rows}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
