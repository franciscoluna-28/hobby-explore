"use client";
import z from "zod";
import { activitySchema } from "@/schemas/activitySchema";
import { Dropzone } from "@/components/create-tips/dropzone";
import { TipList } from "@/components/create-tips/tip-list";
import useImageStore from "@/store/tips-store";
import CreateActivityForm from "@/components/form/create-activity-form";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi"
import { useState } from "react";


export default function CreateActivity() {
  const tips = useImageStore((state) => state.tips);
  const router = useRouter();

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: Create objects and use guard clauses 
  // TODO: Avoid nesting if statements
  // TODO: Create helper functions to deal with form submission
  // TODO: Try to encapsulate this logic in a hook
  // TODO: Create constants to deal with form submission and toast notifications
  async function submitFormData(formData: FormData) {
    try {
      const response = await fetch("create-activity/api/activities", {
        method: "POST",
        body: formData,
        headers: {
          content: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          toast("Activity uploaded Successfully!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
        } else {
          if (data.error === "Tips must not have empty text!") {
            if (data.emptyTipIndices) {
              const emptyTipIndices = data.emptyTipIndices;
              if (emptyTipIndices.length > 0) {
                const emptyTipIndicesText = emptyTipIndices
                  .map((index: number) => `Tip number ${index + 1}`)
                  .join(", ");
                toast.error(
                  `The following tips have empty descriptions: ${emptyTipIndicesText}`,
                  {
                    hideProgressBar: true,
                    autoClose: 5000,
                  }
                );
              }
            }
          }
          if (data.error === "Activity must have at least one tip!") {
            toast.error("You need to add at least one tip to your activity!", {
              hideProgressBar: true,
              autoClose: 5000,
            });
          }
        }
      } else {
        console.error("HTTP Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function onSubmit(values: z.infer<typeof activitySchema>) {
    try {
      startLoading();
      // Create a new form data object
      const formData = new FormData();

      // Append activity values
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("category", values.category);
      formData.append("accessibility", values.accessibility.toString());
      formData.append("participants", values.participants.toString());

      // Append tips values
      tips.forEach((tip, index) => {
        formData.append(`tips[${index}][id]`, tip.id);
        formData.append(`tips[${index}][text]`, tip.text);
        formData.append(`tips[${index}][image]`, tip.image, tip.image.name);
      });

      await submitFormData(formData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      stopLoading();
    }
  }

  return (
    <>
      <section className="p-16">
        <div className="flex gap-4">
        <Button onClick={ router.back} className="p-0 m-0 bg-transparent hover:bg-transparent"><BiArrowBack className="text-mainBlack text-3xl"/></Button>
        <h1>Share your activity</h1>

        </div>
        <CreateActivityForm handleSubmit={onSubmit} isLoading={isLoading}>
          <TipList />
          <Dropzone />
        </CreateActivityForm>
      </section>
      <ToastContainer />
    </>
  );
}
