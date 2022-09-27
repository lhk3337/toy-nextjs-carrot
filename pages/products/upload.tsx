import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Button from "@components/button";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
interface uploadFormType {
  name: string;
  price: number;
  description: string;
}
const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<uploadFormType>();
  const [uploadProduct, { loading, data }] = useMutation("api/products");
  const onValid = (data: uploadFormType) => {
    if (loading) return;
    uploadProduct(data);
  };
  return (
    <Layout canGoBack title="Upload">
      <form className="space-y-5 px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
            <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div>
          <Input register={register("name")} name="name" label="Name" type="text" required />
        </div>
        <div>
          <Input
            register={register("price")}
            name="price"
            label="Price"
            type="text"
            kind="price"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <TextArea label="Description" name="desc" rows={4} register={register("description")} required />
        </div>
        <Button text={loading ? "Loading" : "Upload product"} />
      </form>
    </Layout>
  );
};

export default Upload;
