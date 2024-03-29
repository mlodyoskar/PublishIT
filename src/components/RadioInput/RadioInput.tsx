import { forwardRef } from 'react';

interface RadioInputProps {
	name: string;
	label: string;
	value: string;
	checked?: boolean;
	id?: string;
	htmlFor?: string;
	errorMessage?: string;
}

const inputErrorStyles =
	'border-red-500 focus:border-red-500 focus:ring-red-500';

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
	({ label, errorMessage, ...props }, ref) => {
		return (
			<div className="flex items-center ">
				<label className="text-md block font-medium text-gray-700">
					<input
						type="radio"
						{...props}
						className={`mr-2 border-gray-300 p-2  text-indigo-500  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
							errorMessage && inputErrorStyles
						}`}
						ref={ref}
					/>
					{label}

					{errorMessage && <div className="mt-1 text-red-600">{errorMessage}</div>}
				</label>
			</div>
		);
	}
);

RadioInput.displayName = 'Input';

export { RadioInput };
