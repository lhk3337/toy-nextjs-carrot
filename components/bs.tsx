export default function Bs() {
  return <h1>Hello</h1>;
}
/*

bs.tsx

console.log("Hello I'm Bs.");
export default function Bs() {
  return <h1>Hello</h1>;
}


------------------------------------------------------
enter.tsx

import Bs from "@components/bs";
-> 일반적으로 import를 할 경우 바로 console.log("Hello I'm Bs.");가 실행된다.

import dynamic from "next/dynamic";
const Bs = dynamic(() => import("@components/bs"));
-> dynamic import로 선언할 걍우 Phone탭에서만 console.log("Hello I'm Bs.");가 실행 된다.

return(

    {method === "phone" && (
        <>
            <Bs />
                <Input
                    register={register("phone")}
                    kind="phone"
                    label="Phone number"
                    name="phone"
                    type="number"
                    required
                />
        </>
    )}


)
*/
