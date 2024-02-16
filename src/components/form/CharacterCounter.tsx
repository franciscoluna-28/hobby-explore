import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  maxCharacterCount: number;
  field: ControllerRenderProps<T>["value"];
};

/**
 * Character counter component for React Hook Form.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ControllerRenderProps} props.field - The field obtained from your component.
 * @param {number} props.maxCharacterCount - Maximum number of characters allowed.
 * @returns {JSX.Element|null} - Rendered character counter or `null` if `field` is not provided.
 *
 * @description
 * Use this component to display a character counter for input fields within React Hook Form.
 * It's advisable to define `maxCharacterCount` as a global constant shared across your form schemas
 * to ensure consistency and maintainability.
 */
export function CharacterCounter<T extends FieldValues>({
  field,
  maxCharacterCount,
}: Props<T>): JSX.Element | null {
  let remainingChars = maxCharacterCount - (field?.value?.length ?? 0);

  if (!field) {
    return null;
  }

  return (
    <span
      className={`text-sm font-normal ${
        field?.value?.length > maxCharacterCount
          ? "text-red-500"
          : "text-slate-500"
      }`}
    >
      {field?.value?.length > maxCharacterCount
        ? `+${-remainingChars}/${maxCharacterCount}`
        : `${maxCharacterCount - remainingChars}/${maxCharacterCount}`}
    </span>
  );
}
