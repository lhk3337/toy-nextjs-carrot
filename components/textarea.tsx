import { UseFormRegisterReturn } from "react-hook-form";
interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  rows?: number;
  placeholder?: string;
  required: boolean;
}
export default function TextArea({ label, name, register, rows, required, placeholder }: TextAreaProps) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-500">
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        {...register}
        required={required}
        placeholder={placeholder}
        className="bordr-gray-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500  focus:ring-orange-500"
      />
    </>
  );
}
