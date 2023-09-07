export function loader() {
  throw new Response("throw-response", { status: 400 });
}

export default function ClientErrorRoute() {
  return <div>throw-response</div>;
}
