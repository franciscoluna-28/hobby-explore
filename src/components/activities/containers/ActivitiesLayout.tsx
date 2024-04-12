type ActivitiesLayoutProps = {
  children: React.JSX.Element[];
};

export function ActivitiesLayout({ children }: ActivitiesLayoutProps) {
  return (
    <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 m-auto content-center items-center">
      {children}
    </ul>
  );
}
