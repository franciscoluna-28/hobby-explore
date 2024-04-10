import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2, LoaderIcon } from "lucide-react";

type Props = ButtonProps & {
  isLoading: boolean;
};

export function ButtonLoading({ ...props }: Props) {
  if (!props.isLoading) {
    return <Button {...props}>{props.children}</Button>;
  }

  return (
    <Button {...props} disabled={props.isLoading}>
      <LoaderIcon className="animate-spin" />
    </Button>
  );
}
