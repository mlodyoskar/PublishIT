import { forwardRef } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface FileInputProps {
	name: string;
	errorMessage?: string;
	accept: string;
}
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
	({ errorMessage, accept, ...props }, ref) => {
		return (
			<div className="flex w-full items-center justify-center">
				<label
					htmlFor="dropzone-file"
					className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-indigo-300 hover:bg-indigo-100"
				>
					{errorMessage && <div>{errorMessage}</div>}
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<AiOutlineCloudUpload size="3rem" className="text-indigo-500" />
						<p className="mb-2 text-sm text-indigo-500">
							<span className="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p className="text-xs text-indigo-500">PNG or JPG (MAX. 800x400px)</p>
					</div>
					<input
						ref={ref}
						{...props}
						id="dropzone-file"
						type="file"
						className="hidden"
						accept={accept}
					/>
				</label>
			</div>
		);
	}
);

FileInput.displayName = 'FileInput';

export { FileInput };
