import { Tables } from "@/lib/database";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  tip: Tables<"tips">;
  index: number;
};

export function TipCarouselCard({ tip, index }: Props) {
  return (
    <Card
      className="rounded-2xl overflow-hidden hover:shadow-md duration-200 w-[350px] max-w-full shadow-sm h-[350px] z-0 
    dark:bg-[#171717] border-transparent dark:border-white/10 "
    >
      <div className="relative overflow-hidden">
        <img
          alt="image"
          className="object-cover !rounded-t-xl min-w-full max-h-[200px] overflow-hidden z-50"
          src={getSupabaseFileUrlFromRelativePath(
            tip?.display_image_url ?? "",
            "tips"
          )}
        />
      </div>
      <CardHeader className="bg-mainGreen h-full">
        <CardDescription className="text-white">
          <h3 className="text-white text-start text-sm">{`Tip #${
            index + 1
          }`}</h3>
          <p className="text-left mt-2">{tip.description}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
