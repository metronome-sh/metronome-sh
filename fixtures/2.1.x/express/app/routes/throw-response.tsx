import { json, type MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  throw json({ health: "ok" });
}

export function action() {
  return null;
}

export default function Index() {
  return null;
}
