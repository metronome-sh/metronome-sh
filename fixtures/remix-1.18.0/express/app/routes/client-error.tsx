import { useEffect } from "react";

export default function ClientErrorRoute() {
  useEffect(() => {
    // Throw in 2 seconds
    setTimeout(() => {
      throw new Error("Client Error");
    }, 2000);
  }, []);

  return <div>client-error</div>;
}
