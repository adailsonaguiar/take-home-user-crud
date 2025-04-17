import { BtnLoading } from "./BtnLoading";

type Props = {
  isLoading: boolean;
  label: string;
};

export const Button = ({ label, isLoading }: Props) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
    >
      {isLoading ? <BtnLoading /> : label}
    </button>
  );
};
