import Head from "next/head";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  Stack,
  Container,
  Avatar,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import AddExerciseDialog from "~/components/addExerciseDialog";
import { useState } from "react";

export default function Home() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const session = useSession();
  const user = session.data?.user;
  const photo = user?.image ?? "/Roy.png";

  const [openAddExerciseDialog, setOpenAddExerciseDialog] = useState(false);
  return (
    <>
      <AddExerciseDialog
        open={openAddExerciseDialog}
        onClose={() => setOpenAddExerciseDialog(false)}
      />
      <Head>
        <title>Exercises</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(to bottom, #09437c, #15162c)",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            p={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={1} direction="row" alignItems="center" gap={1}>
              <Avatar alt="User Avatar" src={photo} />
              <Typography color="white">{user?.name ?? "Guest"}</Typography>
            </Stack>
            <Stack>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddExerciseDialog(true)}
              >
                Log Exercise
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
