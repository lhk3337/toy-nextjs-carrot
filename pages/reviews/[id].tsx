import Button from "@components/button";
import Layout from "@components/layout";
import StarRating from "@components/starRating";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
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
  const { user } = useUser();

  const { data } = useSWR<ReviewData>(router.query.id ? `/api/reviews/${router.query.id}` : null);

  const [starRating, setStarRating] = useState<number>(0);

  const [reviews] = useMutation(router.query.id ? `/api/reviews/${router.query.id}` : "");

  useEffect(() => {
    if (data?.reviewData.createdById === user?.id) {
      if (data?.reviewData?.review) {
        setValue("review", data?.reviewData.review);
      }
    }
  }, [setValue, data, user]);

  useEffect(() => {
    if (data?.reviewData?.score) {
      setStarRating(data?.reviewData.score);
    }
  }, [setStarRating, data]);

  const onValid = (dataForm: ReviewForm) => {
    if (data?.reviewData.createdById === user?.id) {
      reviews({ ...dataForm, starRating });
      reset();
      router.back();
    }
  };
  const onBackClick = () => {
    router.replace("/chats");
  };
  return (
    <>
      {!data ? (
        <div className="flex flex-col space-y-3 py-4">
          <div className=" rounded-lg border-[1px] bg-slate-200  px-32 py-6" />
          <div className=" rounded-lg border-[1px] bg-slate-200  px-32 py-12 " />
          <div className=" rounded-lg border-[1px] bg-slate-200  px-32 py-36" />
        </div>
      ) : (
        <Layout canGoBack title="리뷰 쓰기">
          {data?.reviewData.createdById !== user?.id ? (
            <div className="py-10">
              <Button large text="되돌아가기" onClick={onBackClick} />
            </div>
          ) : (
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
          )}
        </Layout>
      )}
    </>
  );
};
export default Review;
