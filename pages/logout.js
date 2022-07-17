import { useRouter } from "next/router";
import React from "react";

export default function Logout() {
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/logout", { method: "POST" });
    router.push("/");
  });

  return <></>;
}
