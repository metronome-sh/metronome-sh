import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader() {
  throw new Error("error" + Date.now());

  return { project: { id: "1" } };
}

export async function action() {
  throw new Error("error" + Date.now());

  return { baz: "qux" };
}

export default function Index() {
  return <div>error</div>;
}
