import { forwardRef } from 'react';

interface InputProps {
	name: string;
	type: string;
	labelVisable?: boolean;
	label: string;
	errorMessage?: string;
	inputMode?: React.HTMLAttributes<HTMLLIElement>['inputMode'];
	placeholder?: string;
	accept?: string;
	autoComplete?: string;
}

const inputErrorStyles =
	'border-red-500 focus:border-red-500 focus:ring-red-500';

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, labelVisable = true, errorMessage, ...props }, ref) => {
		return (
			<>
				<label className="block text-sm font-medium text-gray-700">
					{labelVisable && label}
					<input
						{...props}
						className={`mt-1 w-full appearance-none rounded-lg border-gray-300 py-2 px-3 text-gray-700  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
							errorMessage && inputErrorStyles
						}`}
						ref={ref}
					/>
					{errorMessage && <div className="mt-1 text-red-600">{errorMessage}</div>}
				</label>
			</>
		);
	}
);

Input.displayName = 'Input';

export { Input };
