import React, { forwardRef } from 'react';

interface TextareaProps {
  rows: number;
  name: string;
  placeholder?: string;
  children: React.ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <label className="block text-sm font-medium text-gray-700">
          {children}
          <textarea
            {...props}
            className="shadow-sm appearance-none border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700  mt-1 focus:border-indigo-500 focus:ring-indigo-500 "
            ref={ref}
          />
        </label>
      </>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
