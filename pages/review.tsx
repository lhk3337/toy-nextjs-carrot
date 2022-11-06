import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

interface ReviewForm {
  review: string;
}
const Review: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<ReviewForm>();
  const onValid = (data: ReviewForm) => {
    console.log(data);
    reset();
  };
  return (
    <Layout canGoBack title="리뷰 작성">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-4 py-6">
        {/* star Rating Components */}
        <TextArea
          register={register("review", { required: true, minLength: 5 })}
          rows={8}
          placeholder="Write a review"
          required
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};
export default Review;
