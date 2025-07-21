import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { paths } from "~/path";
import { useRouter } from "next/router";
import DashboardHome from "./home";

export default function Index() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "unauth" | "auth">(
    "loading",
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          setStatus("unauth");
          await router.push(paths.auth_signin);
        } else {
          setStatus("auth");
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };
    void checkSession();
  }, [router]);

  if (status !== "auth") return null;

  return <DashboardHome />;
}
