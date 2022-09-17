import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  kind?: "text" | "phone" | "price";
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegisterReturn;
  required: boolean;
}
export default function Input({ name, label, kind = "text", register, placeholder, type, required }: InputProps) {
  return (
    <>
      <label className="mb-2 text-sm font-medium text-gray-500" htmlFor={name}>
        {label}
      </label>
      <div className="mt-3">
        {kind === "text" ? (
          <div className="flex rounded-sm shadow-sm">
            <input
              {...register}
              required={required}
              type={type}
              id={name}
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        ) : null}
        {kind === "phone" ? (
          <div className="flex rounded-sm shadow-sm">
            <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              +82
            </span>
            <input
              {...register}
              required={required}
              type={type}
              id={name}
              className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        ) : null}
        {kind === "price" ? (
          <div className="relative flex items-center rounded-md shadow-sm">
            <div className="items-cetner pointer-events-none absolute left-0 flex justify-center pl-3">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              id={name}
              {...register}
              required={required}
              placeholder={placeholder}
              type={type}
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="pointer-events-none  absolute right-0 flex items-center pr-3">
              <span className="text-gray-500">KRW</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
