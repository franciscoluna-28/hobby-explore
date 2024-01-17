import { SUPPORTED_IMAGE_SIZE } from "@/constants/activities/supportedImagesFormats";
import { SupportedImageFormats } from "@/types/files";

export function isValidImageFormat(
  format: string
): format is SupportedImageFormats {
  return ["jpg", "jpeg", "png"].includes(format);
}

export function isValidImageSize(size: number): boolean {
  return size <= SUPPORTED_IMAGE_SIZE;
}
