import { cls } from "@libs/client/utils";
import Image from "next/image";
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
          <div className="relative -z-10 h-8 w-8">
            <Image className="rounded-full object-cover" layout="fill" src={img} alt="avatar" />
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-slate-300" />
        )}
        <div>
          <span
            className={cls(
              "w-1/2 rounded-3xl  bg-slate-100 px-4 py-3 text-sm text-black",
              reversed ? "bg-orange-500 text-white" : ""
            )}
          >
            {message}
          </span>
        </div>
      </div>
    </>
  );
}
