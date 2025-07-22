import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardHome from "./home";
import { paths } from "~/path";

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push(paths.auth_signin);
    }
  }, [status, router]);

  if (status !== "authenticated") return null;

  return <DashboardHome />;
}
