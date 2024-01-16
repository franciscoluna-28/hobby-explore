import { HiOutlineMailOpen } from "react-icons/hi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/lib/database";

type EmailCardProps = {
  email?: Tables<"users">["email"];
};

export function EmailCard({ email }: EmailCardProps) {
  return (
    <Card className="p-2 rounded-[16px] min-w-[342px]">
      <CardHeader className="!px-2 !py-1">
        <CardTitle className="text-base flex items-center gap-2 !py-0">
          <HiOutlineMailOpen />
          Email
        </CardTitle>
      </CardHeader>
      <CardContent className="!py-1 !px-2">
        <p className="text-slate-600 text-sm">{email ?? "example@gmail.com"}</p>
      </CardContent>
    </Card>
  );
}
