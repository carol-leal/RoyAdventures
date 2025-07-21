import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Stack } from "@mui/material";

import styles from "./index.module.css";
import SignIn from "./auth/signin";

export default function Home() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();
  return (
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
          <main className={styles.main}>
            <div className={styles.container}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  alt="Roy"
                  src="/Roy.png"
                  sx={{ width: 56, height: 56 }}
                />
                <h1 className={styles.title}>
                  Roy <span className={styles.pinkSpan}>Adventures</span>
                </h1>
              </Stack>
              <div className={styles.cardRow}>
                <Link
                  className={styles.card}
                  href="https://github.com/carol-leal/RoyAdventures"
                  target="_blank"
                >
                  <h3 className={styles.cardTitle}>About →</h3>
                  <div className={styles.cardText}>
                    Everything you need to know to get started with Roy
                    Adventures.
                  </div>
                </Link>
                <Link className={styles.card} href="/exercises">
                  <h3 className={styles.cardTitle}>Exercise Logging →</h3>
                  <div className={styles.cardText}>
                    Track your workouts and progress with ease.
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}
