import React, { forwardRef } from 'react';

interface InputProps {
  name: string;
  children: React.ReactNode;
}

const InputAndLabel = forwardRef<HTMLInputElement, InputProps>(
  ({ children, name, ...props }, ref) => {
    return (
      <>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {children}
          <input
            {...props}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            ref={ref}
          />
        </label>
      </>
    );
  }
);

InputAndLabel.displayName = 'InputAndLabel';

export { InputAndLabel };
