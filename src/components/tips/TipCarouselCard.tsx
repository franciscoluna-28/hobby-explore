import { Tables } from "@/lib/database";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  tip: Tables<"tips">;
};

export function TipCarouselCard({ tip }: Props) {
  return (

      <Card className="rounded-2xl hover:shadow-md duration-200 w-[350px] shadow-sm h-[320px] z-0 bg-mainGreen border-none ">
        <div className="relative overflow-hidden">
          <img
            className="object-cover !rounded-t-xl w-full h-[200px] overflow-hidden z-50"
            src={getSupabaseFileUrlFromRelativePath(tip?.display_image_url ?? "", "tips")}
          />
        </div>
        <CardHeader>
        <CardDescription className="text-white">
        {tip.description}
        </CardDescription>
        </CardHeader>
      </Card>

  );
}
