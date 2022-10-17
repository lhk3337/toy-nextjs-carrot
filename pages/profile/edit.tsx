import type { NextPage } from "next";
import Layout from "@components/layout";
import Input from "@components/input";
import Button from "@components/button";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import firebase from "@libs/server/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const Edit: NextPage = () => {
  const { user } = useUser();
  const [avatarPreview, setAvatarPreview] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
    // 백엔드에서 데이터 불러와 input에 출력하기
  }, [user, setValue]);

  const [editProfile, { data, loading }] = useMutation<EditProfileResponse>("/api/users/me");

  const onValid = ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email or phone number are required. Please enter one of the two.",
      });
    }

    if (avatar && avatar.length > 0) {
      const file = avatar[0];

      const storageService = getStorage(firebase);
      const imageRef = ref(storageService, "image" + file.text);
      uploadBytes(imageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });

      // ask firebase url
      // upload file to firebase
      editProfile({
        email,
        phone,
        name,
        // avatar URL
      });
    } else {
      editProfile({ email, phone, name });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push(`/profile`);
    }
  }, [data, router]);

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];

      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  // console.log(avatarPreview);
  console.log(typeof avatarPreview);
  return (
    <Layout canGoBack title="Edit Profile">
      <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-4">
          {avatarPreview ? (
            <img src={avatarPreview} className="h-14 w-14 rounded-full bg-transparent" />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-100"
          >
            Change
            <input {...register("avatar")} type="file" className="hidden" id="picture" accept="image/*" />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            register={register("name")}
            label="Name"
            name="email"
            type="text"
            placeholder="이름을 입력해주세요"
            required={false}
          />
        </div>
        <div className="space-y-1">
          <Input
            register={register("email")}
            label="Email address"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            required={false}
          />
        </div>
        <div className="space-y-1">
          <Input
            register={register("phone")}
            kind="phone"
            label="Phone number"
            name="phone"
            type="number"
            placeholder="전화번호를 입력해주세요"
            required={false}
          />
        </div>
        {errors.formErrors ? (
          <span className="my-1 block text-center text-sm font-bold text-red-500">{errors.formErrors?.message}</span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update Profile"} />
      </form>
    </Layout>
  );
};
export default Edit;
