"use client";
import z from "zod";
import { activitySchema } from "@/schemas/activitySchema";
import { Dropzone } from "@/components/create-tips/dropzone";
import { TipList } from "@/components/create-tips/tip-list";
import useImageStore from "@/store/tips-store";
import CreateActivityForm from "@/components/form/create-activity-form";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";
import { useUploadActivity } from "@/hooks/use-upload-activity";

export default function CreateActivity() {
  const tips = useImageStore((state) => state.tips);
  const resetTips = useImageStore((state) => state.resetTips);
  const router = useRouter();

  const { isLoading, uploadActivity } = useUploadActivity();

  const onSubmit = async (values: z.infer<typeof activitySchema>) => {
    const formData = new FormData();
    console.log(formData);

    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("category", values.category);
    formData.append("accessibility", values.accessibility.toString());
    formData.append("participants", values.participants.toString());

    tips.forEach((tip, index) => {
      formData.append(`tips[${index}][id]`, tip.id);
      formData.append(`tips[${index}][text]`, tip.text);
      formData.append(`tips[${index}][image]`, tip.image, tip.image.name);
    });

    await uploadActivity(formData);
  };

  return (
    <>
      <section className="w-full">
        <CreateActivityForm handleSubmit={onSubmit} isLoading={isLoading}/>

      </section>
      <Toaster richColors />
    </>
  );
}
