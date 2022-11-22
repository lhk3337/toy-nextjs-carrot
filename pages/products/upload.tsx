import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";

import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Button from "@components/button";
import useMutation from "@libs/client/useMutation";
import { v4 as uuidv4 } from "uuid";
import firebase from "@libs/server/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface uploadFormType {
  name: string;
  price: number;
  description: string;
  productImage?: FileList;
}

interface uploadMutationType {
  ok: boolean;
  product: Product;
}
const Upload: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<uploadFormType>();
  const [imageFile, setImageFile] = useState<FileList>();
  const [productPreview, setProductPreview] = useState("");
  const [uploadProduct, { loading, data }] = useMutation<uploadMutationType>("/api/products");

  const onValid = ({ name, price, description }: uploadFormType) => {
    if (loading) return;
    if (imageFile && imageFile.length > 0) {
      const storageService = getStorage(firebase);
      const imageRef = ref(storageService, `product/${uuidv4()}`);
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
            uploadProduct({
              price,
              description,
              name,
              productImage: url,
            });
          });
        }
      );
    } else {
      uploadProduct({ name, price, description });
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  const productImg = watch("productImage");
  useEffect(() => {
    setImageFile(productImg);
    if (imageFile && imageFile.length > 0) {
      setProductPreview(URL.createObjectURL(imageFile[0]));
    }
  }, [setImageFile, imageFile, watch, productImg]);

  return (
    <Layout canGoBack title="Upload" seoTitle="Upload Product | Carrot Market">
      <form className="space-y-5 px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <div>
          {productPreview ? (
            <div className="relative -z-10 h-64 w-full">
              <Image
                src={productPreview}
                className="round-md object-contain text-gray-600"
                layout="fill"
                alt="uploadImage"
              />
            </div>
          ) : (
            <label className="flex h-64 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
              <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input {...register("productImage")} className="hidden" type="file" accept="image/*" />
            </label>
          )}
        </div>
        <div>
          <Input register={register("name")} name="name" label="Name" type="text" required />
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
          <TextArea label="Description" name="desc" rows={4} register={register("description")} required />
        </div>
        <Button text={loading ? "Loading" : "Upload product"} />
      </form>
    </Layout>
  );
};

export default Upload;
