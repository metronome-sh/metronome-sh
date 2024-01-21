import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  return { project: { id: "1" } };
}

export async function action() {
  return { baz: "qux" };
}

export default function Index() {
  return <div>project.$id</div>;
}
