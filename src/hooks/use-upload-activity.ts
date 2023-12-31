import { useState } from "react";
import { toast } from "sonner"
import { UPLOAD_ACTIVITY_CONSTANTS } from "@/constants/upload-activity/upload-activity";
import useImageStore from "@/store/tips-store";

export const useUploadActivity = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetTips = useImageStore((state) => state.resetTips);
  const tips = useImageStore((state) => state.tips);

  console.log(tips);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const submitFormData = async (formData: FormData) => {
    try {
      const response = await fetch("create-activity/api/activities", {
        method: "POST",
        body: formData,
        headers: {
          content: "application/json",
        },
      });

      if (!response.ok) {
        console.error("HTTP Error:", response.status);
        return;
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success(UPLOAD_ACTIVITY_CONSTANTS.successMessage);


      } else {
        handleUploadError(data.error, data.emptyTipIndices);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const errorHandlers: Record<string, (emptyTipIndices?: number[]) => void> = {
    [UPLOAD_ACTIVITY_CONSTANTS.emptyTipTextError]: (emptyTipIndices) => {
      if (emptyTipIndices && emptyTipIndices.length > 0) {
        const emptyTipIndicesText = emptyTipIndices
          .map((index) => `Tip number ${index + 1}`)
          .join(", ");
        toast.error(
          `The following tips have empty descriptions: ${emptyTipIndicesText}`
        );
      }
    },
    [UPLOAD_ACTIVITY_CONSTANTS.activityTipError]: () => {
      toast.error("You need to add at least one tip to your activity!", {
      });
    },
  };

  const handleUploadError = (errorType: string, ...args: any[]) => {
    const errorHandler = errorHandlers[errorType];
    if (errorHandler) {
      errorHandler(...args);
    } else {
      console.error("Unknown error type:", errorType);
    }
  };

  const uploadActivity = async (formData: FormData) => {
    startLoading();

    try {
      await submitFormData(formData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      stopLoading();
    }
  };

  return { isLoading, uploadActivity };
};
