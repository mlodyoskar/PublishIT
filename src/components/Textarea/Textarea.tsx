import { forwardRef } from 'react';

interface TextareaProps {
	rows: number;
	name: string;
	label: string;
	errorMessage?: string;
	placeholder?: string;
}

const textareaErrorStyles =
	'border-red-500 focus:border-red-500 focus:ring-red-500';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, errorMessage, ...props }, ref) => {
		return (
			<>
				<label className="block text-sm font-medium text-gray-700">
					{label}
					<textarea
						{...props}
						className={`mt-1 w-full appearance-none rounded-lg border-gray-300 py-2 px-3 text-gray-700  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
							errorMessage && textareaErrorStyles
						}`}
						ref={ref}
					/>
					{errorMessage && <div className="text-red-600">{errorMessage}</div>}
				</label>
			</>
		);
	}
);

Textarea.displayName = 'Textarea';

export { Textarea };
