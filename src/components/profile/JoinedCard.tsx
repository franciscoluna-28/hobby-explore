import { format } from "date-fns";
import { RiHome7Line } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/lib/database";

type JoinedCardProps = {
  createdAt?: Tables<"users">["created_at"];
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return format(parsedDate, "EEE, dd MMM yyyy HH:mm:ss") + " GMT";
};

export function JoinedCard({ createdAt }: JoinedCardProps) {
  return (
    <Card className="p-2 rounded-[16px] min-w-[342px]">
      <CardHeader className="!px-2 !py-1">
        <CardTitle className="text-base flex items-center gap-2 !py-0">
          <RiHome7Line />
          Joined
        </CardTitle>
      </CardHeader>
      <CardContent className="!py-1 !px-2">
        <p className="text-slate-600 text-sm">
          {createdAt
            ? formatDate(createdAt)
            : formatDate(new Date().toDateString())}
        </p>
      </CardContent>
    </Card>
  );
}
