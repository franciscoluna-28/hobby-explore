import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  maxCharacterCount: number;
  field: any;
};

export function CharacterCounter<T extends FieldValues>({
  field,
  maxCharacterCount,
}: Props<T>) {
  let remainingChars = maxCharacterCount - (field?.value?.length ?? 0);
  return (
    <div
      className={`text-sm font-normal ${
        field?.value?.length > maxCharacterCount
          ? "text-red-500"
          : "text-slate-500"
      }`}
    >

      {field?.value?.length > maxCharacterCount
        ? `+${-remainingChars}/${maxCharacterCount}`
        : `${maxCharacterCount - remainingChars}/${maxCharacterCount}`}
    </div>
  );
}
