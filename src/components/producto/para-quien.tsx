import { Users } from "lucide-react";

/** "Para quién es". Doc 06 sprint 4.5. */
export function ParaQuien({ items }: { items: string[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg">
        <Users className="size-5 text-parh-cyan-600" aria-hidden="true" />
        Para quién es
      </h3>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md bg-parh-slate-50 px-3.5 py-2.5 text-sm text-parh-slate-600"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
