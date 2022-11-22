import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
interface CreateForm {
  name: string;
  price: number;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const [createStream, { loading, data }] = useMutation<CreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateForm>();
  const router = useRouter();
  const onValid = (data: CreateForm) => {
    if (loading) return;
    createStream(data);
  };
  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Create Live Stream" seoTitle="create Live | Carrot Market">
      <form className="space-y-5 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <Input register={register("name", { required: true })} name="name" label="Name" type="text" required />
        </div>
        <div>
          <Input
            register={register("price", { required: true, valueAsNumber: true })}
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
        <Button text={loading ? "Loading..." : "Go Live"} />
      </form>
    </Layout>
  );
};

export default Create;
