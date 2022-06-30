import { forwardRef } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

// const FileInput = (
//   <Input
//     label="Cover image"
//     type="file"
//     accept="image/png, image/jpg"
//     {...register('imageFile')}
//   />
// );
// {

interface FileInputProps {
  name: string;
  errorMessage?: string;
  accept: string;
}
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ errorMessage, accept, ...props }, ref) => {
    return (
      <div className="flex justify-center items-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col justify-center items-center w-full h-64 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-indigo-300 hover:bg-indigo-100"
        >
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <AiOutlineCloudUpload size="3rem" className="text-indigo-500" />
            <p className="mb-2 text-sm text-indigo-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-indigo-500">
              PNG or JPG (MAX. 800x400px)
            </p>
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
