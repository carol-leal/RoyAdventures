import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { paths } from "~/path";

export default function Index() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          await router.push(paths.auth_signin);
        } else {
          await router.push(paths.dashboard.home);
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };
    void checkSession();
  }, [router]);

  return null;
}

/*   return (
    <>
      {sessionData ? (
        <>
          <Head>
            <title>Roy Adventures</title>
            <meta
              name="description"
              content="Fitness tracking app with TTRPG elements"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
} */
