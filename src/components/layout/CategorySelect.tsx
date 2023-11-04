type Props = {
  name: string;
  id: number;
  isActive: boolean;
};

export function CategorySelect({ name, id, isActive }: Props) {
  return (
    <li className="bg-gray text-slate-500 p-2 rounded-full px-4" key={id}>
      {name}
    </li>
  );
}
