import { cls } from "@libs/client/utils";
interface ButtonProps {
  text: string;
  large?: boolean;
  [key: string]: any;
}
export default function Button({ text, large = false, onClick, ...rest }: ButtonProps) {
  return (
    <>
      <button
        className={cls(
          "w-full rounded-md border border-transparent bg-orange-500 px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          large ? "py-3 text-lg font-bold" : "py-2 text-sm"
        )}
        {...rest}
      >
        {text}
      </button>
    </>
  );
}
