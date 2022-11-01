import { cls } from "@libs/client/utils";
import Image from "next/image";
import Time from "./time";
interface MessageProps {
  message: string;
  reversed?: boolean;
  img?: string;
  sendTime: Date;
}
export default function Message({ message, sendTime: time, reversed, img }: MessageProps) {
  const sendTime = new Date(time);

  return (
    <>
      <div
        className={cls(
          "flex-start flex items-center space-x-2 pb-4",
          reversed ? "flex-row-reverse space-x-reverse" : ""
        )}
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
              "w-1/2 rounded-3xl  px-4 py-3 text-sm ",
              reversed ? "bg-orange-500 text-white" : "bg-slate-100 text-black"
            )}
          >
            {message}
          </span>
        </div>
        <Time time={sendTime} />
      </div>
    </>
  );
}
