import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

type Props = {
  label: string;
  value: string;
  name: string;
  type: HTMLInputTypeAttribute;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  name,
  type,
  value,
  onChange,
  label,
  error,
  ...rest
}: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full h-8 p-2 rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
    </div>
  );
};
