import { cls } from "@libs/client/utils";
import React from "react";

interface starRatintProps {
  setStarRating: React.Dispatch<React.SetStateAction<number>>;
  starRating: number;
}

export default function StarRating({ setStarRating, starRating }: starRatintProps) {
  const onStarChange = (star: number) => {
    setStarRating(star);
  };
  return (
    <div className="my-1 flex items-center justify-around">
      {Array(5)
        .fill(0)
        .map((_, star) => {
          return (
            <label key={star}>
              <input
                type="radio"
                name="rating"
                onChange={() => onStarChange(star)}
                value={starRating}
                checked={star === starRating}
                className="hidden"
              />
              <svg
                key={star}
                className={cls(" h-10 w-10", starRating >= star ? "text-yellow-300" : "text-slate-300")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </label>
          );
        })}
    </div>
  );
}

// import { cls } from "@libs/client/utils";
// import { useEffect, useState } from "react";

// export default function StarRating() {
//   const [starRating, setStarRating] = useState(0);
//   useEffect(() => {
//     setStarRating(5);
//   }, []);
//   return (
//     <div className="my-1 flex items-center justify-around">
//       {Array(5)
//         .fill(1)
//         .map((_, star) => {
//           return (
//             <svg
//               key={star}
//               className={cls(" h-10 w-10", starRating >= star + 1 ? "text-yellow-300" : "text-slate-300")}
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//           );
//         })}
//     </div>
//   );
// }
