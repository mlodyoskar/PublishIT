import { forwardRef } from 'react';

interface InputProps {
  name: string;
  type: string;
  label: string;
  errorMessage?: string;
  placeholder?: string;
  accept?: string;
}

const inputErrorStyles =
  'border-red-500 focus:border-red-500 focus:ring-red-500';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <input
            {...props}
            className={`shadow-sm appearance-none border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700  mt-1 focus:border-indigo-500 focus:ring-indigo-500 ${
              errorMessage && inputErrorStyles
            }`}
            ref={ref}
          />
          {errorMessage && (
            <div className="text-red-600 mt-1">{errorMessage}</div>
          )}
        </label>
      </>
    );
  }
);

Input.displayName = 'Input';

export { Input };
