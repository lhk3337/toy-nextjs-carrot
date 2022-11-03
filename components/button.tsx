import { cls } from "@libs/client/utils";
interface ButtonProps {
  text: string;
  large?: boolean;
  small?: boolean;
  alertColor?: boolean;
  [key: string]: any;
}
export default function Button({
  text,
  small = false,
  large = false,
  sold = false,
  reserve = false,
  alertColor = false,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={cls(
          "border-transparent, rounded-md border px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          small ? "" : "w-full",
          large ? "py-3 text-lg font-bold" : "py-2 text-sm",
          sold ? "cursor-default bg-gray-400 hover:bg-gray-400 focus:ring-current" : "",
          reserve ? "cursor-default hover:bg-orange-500 focus:ring-current" : "",
          alertColor
            ? "bg-red-500 hover:bg-red-700 focus:ring-red-700"
            : "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500"
        )}
        onClick={onClick}
        {...rest}
      >
        {text}
      </button>
    </>
  );
}
