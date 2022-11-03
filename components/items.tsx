import Link from "next/link";
import Image from "next/image";
import ProductStateText from "./productStateText";
interface ItemsProps {
  title?: string;
  price?: number;
  heart?: number;
  comment?: number;
  id?: number;
  itemState: string;
  imgurl?: string;
}

export default function Items({ title, id, itemState, price, heart, comment, imgurl }: ItemsProps) {
  return (
    <>
      {id ? (
        <Link href={`/products/${id}`}>
          <a className="flex cursor-pointer justify-between px-4 pt-4">
            <div className="flex items-center space-x-5">
              {imgurl ? (
                <div className="relative -z-10 h-20 w-20">
                  <Image
                    src={imgurl}
                    className="rounded-md"
                    layout="fill"
                    objectFit="cover"
                    alt="productImg"
                    priority
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-md bg-gray-400" />
              )}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                <div>
                  <ProductStateText data={itemState} small />
                  <span className="text-gray-9000 mt-1 ml-2 font-bold">{price?.toLocaleString("ko-KR")}원</span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end space-x-3">
              <div className="flex items-center space-x-0.5 text-sm text-gray-600 ">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span>{heart}</span>
              </div>
              <div className="flex items-center space-x-0.5 text-sm text-gray-600 ">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>{comment}</span>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex items-center space-x-5">
            {imgurl ? (
              <div className="relative -z-10 h-20 w-20">
                <Image src={imgurl} className="rounded-md" layout="fill" objectFit="cover" alt="productImg" priority />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-md bg-gray-400" />
            )}
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
              <span className="text-gray-9000 mt-1 font-bold">{price?.toLocaleString("ko-KR")}원</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
