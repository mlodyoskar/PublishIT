import React, { forwardRef } from 'react';

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  children: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <label className="block text-sm font-medium text-gray-700">
          {children}
          <input
            {...props}
            className="shadow-sm appearance-none border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700  mt-1 focus:border-indigo-500 focus:ring-indigo-500 "
            ref={ref}
          />
        </label>
      </>
    );
  }
);

Input.displayName = 'Input';

export { Input };
