type ActivitiesLayoutProps = {
  children: React.JSX.Element[];
};

export function ActivitiesLayout({ children }: ActivitiesLayoutProps) {
  return <ul className="flex flex-wrap gap-6 justify-center">{children}</ul>;
}
