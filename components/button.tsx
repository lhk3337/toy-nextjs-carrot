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
  alertColor = false,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={cls(
          "rounded-md border border-transparent px-4 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          small ? "" : "w-full",
          large ? "py-3 text-lg font-bold" : "py-2 text-sm",
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
