import Router from "next/router";
import React from "react";
import useSWR from "swr";

export default function useUser({
  ifLogged = false,
  ifNotLogged = false,
} = {}) {
  const { data: user } = useSWR("/api/user");

  React.useEffect(() => {
    if (!ifNotLogged || !ifLogged || !user) return;

    if (ifLogged && user.isLoggedIn) {
      Router.push(ifLogged);
    }

    if (ifNotLogged && !user.isLoggedIn) {
      Router.push(ifNotLogged);
    }
  }, [user, ifLogged, ifNotLogged]);

  return { user };
}
