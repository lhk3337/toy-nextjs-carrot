import type { NextPage } from "next";
import { useEffect } from "react";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}

interface WritePost {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { register, handleSubmit, reset } = useForm<WriteForm>();
  const router = useRouter();
  const [post, { loading, data }] = useMutation<WritePost>("/api/posts");

  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
    reset();
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Write Post" seoTitle="Post Write">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-4 py-6">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          rows={8}
          placeholder="Answer this question!"
          required
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};
export default Write;
