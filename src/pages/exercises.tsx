import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import styles from "./index.module.css";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";

export default function Home() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Exercises</title>
        <meta
          name="description"
          content="Fitness tracking app with TTRPG elements"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <h1>Exercise Logging</h1>
        <div>
          <h3>Log Exercise</h3>
          <div>Record a new exercise entry.</div>
        </div>
        <FormControl>
          <InputLabel htmlFor="exercise-name">Exercise Name</InputLabel>
          <Input id="exercise-name" />
          <FormHelperText id="exercise-name-helper-text">
            Enter the name of the exercise you want to log.
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );
}
