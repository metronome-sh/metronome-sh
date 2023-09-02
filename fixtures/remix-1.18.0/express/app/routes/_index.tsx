import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  // wait a second to simulate an async loader
  // new Promise((resolve) => setTimeout(resolve, 1000));

  return { date: new Date() };
}

export function action() {
  return null;
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/client-error">client-error</Link>
        </li>
        <li>
          <Link to="/loader-error">loader-error</Link>
        </li>
        <li>
          <Link to="/id/foo">id: foo</Link>
        </li>
      </ul>
    </div>
  );
}
