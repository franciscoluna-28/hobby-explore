import { AiOutlineLoading } from "react-icons/ai";

import { Button, ButtonProps } from "@/components/ui/button";
import { LoadingIcon } from "./LoadingIcon";

type Props = ButtonProps & {
  isLoading: boolean;
};

export function ButtonLoading({ ...props }: Props) {
  if (!props.isLoading) {
    return <Button {...props}>{props.children}</Button>;
  }

  return (
    <Button {...props} disabled={props.isLoading}>
    <LoadingIcon/>
    </Button>
  );
}
