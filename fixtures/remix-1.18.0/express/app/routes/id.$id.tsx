import { Outlet } from "@remix-run/react";

export default function BirdRoute() {
  return (
    <div>
      <div>id.$id</div>
      <Outlet />
    </div>
  );
}
