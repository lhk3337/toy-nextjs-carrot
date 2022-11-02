import type { NextPage } from "next";
import Layout from "@components/layout";
import Input from "@components/input";
import Button from "@components/button";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import firebase from "@libs/server/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
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
  const [imageFile, setImageFile] = useState<FileList>();
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
    if (user?.avatar) setAvatarPreview(user.avatar);
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

    if (imageFile && imageFile.length > 0) {
      if (imageFile[0].size < 500000) {
        const storageService = getStorage(firebase);
        const imageRef = ref(storageService, `profile/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              editProfile({
                email,
                phone,
                name,
                avatar: url,
              });
            });
          }
        );
      } else {
        alert(`해당 파일은 제한된 용량을 초과하였습니다.`);
      }
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

  const setAvatar = watch("avatar");

  useEffect(() => {
    setImageFile(setAvatar);
    if (imageFile && imageFile.length > 0) {
      setAvatarPreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile, setAvatar]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-4">
          {avatarPreview ? (
            <div className="relative -z-10 h-14 w-14">
              <Image
                src={avatarPreview}
                layout="fill"
                className="rounded-full bg-transparent object-cover"
                alt="avatar"
                priority
              />
            </div>
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
        {errors.formErrors && (
          <span className="my-1 block text-center text-sm font-bold text-red-500">{errors.formErrors?.message}</span>
        )}
        <Button text={loading ? "Loading..." : "Update Profile"} />
      </form>
    </Layout>
  );
};
export default Edit;
