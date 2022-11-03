import { isSelectDealState } from "@libs/client/isSelectDealState";
import { cls } from "@libs/client/utils";
interface Props {
  [key: string]: any;
  small?: boolean;
}

export default function ProductStateText({ data, small = false }: Props) {
  const productStateView = isSelectDealState
    .filter((type) => type.value === data)
    .map((el) => el.name)
    .join("");
  return (
    <span
      className={cls(
        "mb-3",
        small ? "text-sm font-semibold" : "text-lg  font-bold",
        productStateView === "판매중"
          ? "text-orange-500"
          : productStateView === "예약중"
          ? "text-green-500"
          : "text-slate-600"
      )}
    >
      {productStateView}
    </span>
  );
}
