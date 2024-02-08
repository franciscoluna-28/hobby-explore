import { z } from "zod";

const MAX_FILE_SIZE_MB: number = 2;
const MAX_FILE_SIZE: number = MAX_FILE_SIZE_MB * 1000000;
const FILE_SIZE_ERROR: string = `File should be less than ${MAX_FILE_SIZE_MB}mb.`;

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const MINIMUM_FILES_REQUIRED: number = 1;
const MINIMUM_ARRAY_SIZE_MESSAGE: string = `You need to provide at least ${MINIMUM_FILES_REQUIRED} file`;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/*",
];
const FILE_TYPE_ERROR: string = `We only support images with the following extensions: ${ACCEPTED_IMAGE_TYPES.join(
  ", "
)}`;
const INVALID_FILE_MESSAGE: string = `File is not valid`;

const isFile = (file: File): boolean => file instanceof File;
const isFileSizeValid = (file: File): boolean => file.size <= MAX_FILE_SIZE;
const isFileTypeValid = (file: File): boolean =>
  ACCEPTED_IMAGE_TYPES.includes(file.type);

// Validate images client side
export const ImageFileSchema = z.object({
  document: z
    .array(z.custom<File>())
    .min(MINIMUM_FILES_REQUIRED, { message: MINIMUM_ARRAY_SIZE_MESSAGE })
    .refine((files) => files.every(isFile), {
      message: INVALID_FILE_MESSAGE,
    })
    .refine((files) => files.every(isFileSizeValid), {
      message: FILE_SIZE_ERROR,
    })
    .refine((files) => files.every(isFileTypeValid), {
      message: FILE_TYPE_ERROR,
    }),
});

// Validate images server side
export const ServerImageFileSchema = z.object({
  profileImage: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Image is required")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_FILE_SIZE
      );
    }, FILE_SIZE_ERROR)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, FILE_TYPE_ERROR),
});
