import Button from "@components/button";
import Layout from "@components/layout";
import StarRating from "@components/starRating";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Review } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface ReviewForm {
  review: string;
}

interface ReviewData {
  ok: boolean;
  reviewData: Review;
}

const Review: NextPage = () => {
  const { register, handleSubmit, reset, setValue } = useForm<ReviewForm>();

  const router = useRouter();
  const { data } = useSWR<ReviewData>(router.query.id ? `/api/reviews/${router.query.id}` : null);

  const [starRating, setStarRating] = useState<number>(0);

  const [reviews] = useMutation(router.query.id ? `/api/reviews/${router.query.id}` : "");

  useEffect(() => {
    if (data?.reviewData?.review) {
      setValue("review", data?.reviewData.review);
    }
  }, [setValue, data]);

  useEffect(() => {
    if (data?.reviewData?.score) {
      setStarRating(data?.reviewData.score);
    }
  }, [setStarRating, data]);

  const onValid = (data: ReviewForm) => {
    reviews({ ...data, starRating });
    reset();
    router.back();
  };

  return (
    <Layout canGoBack title="리뷰 쓰기">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-4 py-6">
        {/* star Rating Components */}
        <StarRating setStarRating={setStarRating} starRating={starRating} />
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
