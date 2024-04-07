import { RiHome7Line } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/lib/database";

type HomeCardProps = {
  location?: Tables<"users">["location"];
};

export function HomeCard({ location }: HomeCardProps) {

  console.log(location)

  return (
    <Card className="p-2 rounded-[16px] min-w-[342px]">
      <CardHeader className="!px-2 !py-1">
        <CardTitle className="text-base flex items-center gap-2 !py-0">
          <RiHome7Line />
          Home
        </CardTitle>
      </CardHeader>
      <CardContent className="!py-1 !px-2">
        <p className="text-slate-600 text-sm">
        {location !== "" && location ? location : "Unknown"}
        </p>
      </CardContent>
    </Card>
  );
}
