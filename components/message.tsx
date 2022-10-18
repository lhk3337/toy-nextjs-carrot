import { cls } from "@libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  img?: string;
}
export default function Message({ message, reversed, img }: MessageProps) {
  return (
    <>
      <div
        className={cls("flex-start flex items-center space-x-2", reversed ? "flex-row-reverse space-x-reverse" : "")}
      >
        {img ? (
          <img className="h-8 w-8 rounded-full" src={img} />
        ) : (
          <div className="h-8 w-8 rounded-full bg-slate-300" />
        )}
        <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm  text-gray-500">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}
