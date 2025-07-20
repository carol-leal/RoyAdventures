import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Stack } from "@mui/material";

import { api } from "~/utils/api";
import styles from "./index.module.css";

export default function Home() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
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
            <Avatar alt="Roy" src="/Roy.png" sx={{ width: 56, height: 56 }} />
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
                Everything you need to know to get started with Roy Adventures.
              </div>
            </Link>
            <Link className={styles.card} href="/exercises">
              <h3 className={styles.cardTitle}>Exercise Logging →</h3>
              <div className={styles.cardText}>
                Track your workouts and progress with ease.
              </div>
            </Link>
          </div>
          <div className={styles.showcaseContainer}>
            <p className={styles.showcaseText}>
              {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  /* const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  ); */

  return (
    <div className={styles.authContainer}>
      <p className={styles.showcaseText}>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {/*         {secretMessage && <span> - {secretMessage}</span>} */}
      </p>
      <button
        className={styles.loginButton}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
