import { defer, json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // console.log({ headers: request.headers, url: request.url });
  // Resolve in 5 seconds
  // const foo = new Promise((resolve) => setTimeout(() => resolve("bar"), 3000));

  // throw new Error("This is an error");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return json({ message: "Hello World!" }, { headers: { "x-foo": "bar" } });
}

export async function action() {
  return json({ foo: "Bar" });
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
