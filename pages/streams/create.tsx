import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Input from "@components/input";
import { useForm } from "react-hook-form";
interface CreateForm {
  name: string;
  price: number;
  description: string;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (data: CreateForm) => {
    console.log(data);
  };

  return (
    <Layout canGoBack title="Create Live Stream">
      <form className="space-y-5 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <Input register={register("name", { required: true })} name="name" label="Name" type="text" required />
        </div>
        <div>
          <Input
            register={register("price", { required: true })}
            name="price"
            label="Price"
            type="text"
            kind="price"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <TextArea
            label="Description"
            name="desc"
            rows={4}
            register={register("description", { required: true })}
            required
          />
        </div>
        <Button text="Go Live" />
      </form>
    </Layout>
  );
};

export default Create;
