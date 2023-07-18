export async function loader() {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  throw new Error("loader-error");
}

export default function LoaderErrorRoute() {
  return <div>loader-error</div>;
}
