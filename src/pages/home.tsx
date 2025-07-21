import Link from "next/link";
import { Avatar, Stack, Typography } from "@mui/material";
import styles from "./index.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt="Roy" src="/Roy.png" sx={{ width: 56, height: 56 }} />
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem" },
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Roy <span style={{ color: "#1E90FF" }}>Adventures</span>
          </Typography>
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
      </div>
    </main>
  );
}
