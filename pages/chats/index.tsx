import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="divide-y-[1px] divide-gray-300 py-10">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <div key={i} className="mb-3 flex cursor-pointer items-center space-x-3 px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-500">See you tomorrow in the corner at 2pm!</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
