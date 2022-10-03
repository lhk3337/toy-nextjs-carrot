import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wonderings: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<CommunityPostResponse>(router.query.id ? `/api/posts/${router.query.id}` : null);
  const [wonder, { loading }] = useMutation(`/api/posts/${router.query.id}/wonder`);
  const [sendAnswer, { data: answerData, loading: answerLoading }] = useMutation<AnswerResponse>(
    `/api/posts/${router.query.id}/answers`
  );
  const onWonderClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            wonderings: data?.post._count.wonderings
              ? data?.post._count.wonderings - 1
              : data?.post._count.wonderings + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!loading) {
      wonder({});
    }
  };
  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
    }
  }, [answerData, reset]);
  return (
    <Layout canGoBack>
      <div className="py-4">
        <span className="items-cente my-2.5 mb-3 ml-4 inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3 border-b  px-4 py-2">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm">{data?.post?.user.name}</p>
            <Link href={`/users/profiles/${data?.post?.user?.id}`}>
              <a className="text-xs text-gray-500">View profile &rarr;</a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="mr-1 font-medium text-orange-500">Q.</span>
            {data?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5 text-gray-700">
            <button
              onClick={onWonderClick}
              className={cls("flex items-center space-x-2 text-sm", data?.isWondering ? "text-orange-500" : "")}
            >
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {data?.post._count.wonderings}</span>
            </button>
            <span className="flex items-center space-x-2 text-sm">
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
              <span>답변 {data?.post._count.answers}</span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.post.answers.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">{answer?.user?.name}</span>
                <span className="block text-xs text-gray-500">{answer?.createdAt?.toString()}</span>
                <p className="mt-2 text-gray-700 ">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="space-y-4 px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            rows={4}
            placeholder="Answer this question!"
            required
            register={register("answer", { required: true, minLength: 5 })}
          />
          <Button text={answerLoading ? "Loading..." : "Reply"} />
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
