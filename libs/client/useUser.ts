import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser(pathname?: string) {
  const router = useRouter();

  const { data, error } = useSWR<ProfileResponse>(pathname === "/enter" ? null : "/api/users/me", (url: string) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
