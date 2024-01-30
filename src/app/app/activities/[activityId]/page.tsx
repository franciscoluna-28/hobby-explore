export default function ActivityPage({
  params,
}: {
  params: {
    activityId: string;
  };
}) {
  return <h1>{params.activityId}</h1>;
}
