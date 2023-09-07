import { redirect } from "@remix-run/server-runtime";

export function loader() {
  throw redirect("/");
}

export default function ClientErrorRoute() {
  return <div>throw-redirect</div>;
}
