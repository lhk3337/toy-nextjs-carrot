import { cls } from "@libs/client/utils";
interface ButtonProps {
  text: string;
  large?: boolean;
  small?: boolean;
  [key: string]: any;
}
export default function Button({ text, small = false, large = false, onClick, ...rest }: ButtonProps) {
  return (
    <>
      <button
        className={cls(
          "rounded-md border border-transparent bg-orange-500 px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          small ? "" : "w-full",
          large ? "py-3 text-lg font-bold" : "py-2 text-sm"
        )}
        onClick={onClick}
        {...rest}
      >
        {text}
      </button>
    </>
  );
}
