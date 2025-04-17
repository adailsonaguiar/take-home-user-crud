type ErrorCalloutProps = {
  message: string;
};

export const ErrorCallout = ({ message }: ErrorCalloutProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 shadow-sm">
      <svg
        className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 3.75a8.25 8.25 0 1 0 0 16.5a8.25 8.25 0 0 0 0-16.5z"
        />
      </svg>
      <div className="text-sm font-medium">{message}</div>
    </div>
  );
};
