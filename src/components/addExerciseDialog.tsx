import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DirectionsRun,
  AccessTime,
  Straighten,
  LocalFireDepartment,
  Speed,
  Favorite,
  FavoriteBorder,
  Category,
  CalendarToday,
} from "@mui/icons-material";

const schema = z.object({
  exerciseName: z.string().min(2).max(100),
  date: z.date(),
  time: z.number().min(0),
  distance: z.number().min(0).optional(),
  calories: z.number().min(0).optional(),
  avgPace: z.number().min(0).optional(),
  avgSpeed: z.number().min(0).optional(),
  avgHeartRate: z.number().min(0).optional(),
  maxHeartRate: z.number().min(0).optional(),
  category: z.string().min(2).max(100).optional(),
});

type exerciseFormType = z.infer<typeof schema>;

export default function AddExerciseDialog(open: boolean) {
  const {
    control,
    formState: { errors },
  } = useForm<exerciseFormType>({
    resolver: zodResolver(schema),
  });

  return (
    <Dialog
      open={open}
      onClose={() => {
        console.log("closed");
      }}
    >
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of the exercise.
        </DialogContentText>
        <Form
          onSubmit={() => {
            console.log("submit");
          }}
          onSuccess={() => {
            console.log("success");
          }}
          onError={() => {
            console.log("error");
          }}
          validateStatus={(status) => status >= 200}
          control={control}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="exerciseName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="name">Exercise Name</InputLabel>
                    <TextField
                      error={!!errors.exerciseName}
                      helperText={errors.exerciseName?.message}
                      {...field}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <DirectionsRun />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="date">Date</InputLabel>
                    <TextField
                      type="date"
                      error={!!errors.date}
                      helperText={errors.date?.message}
                      {...field}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="time"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="time">Time (minutes)</InputLabel>
                    <TextField
                      error={!!errors.time}
                      helperText={errors.time?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTime />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="distance"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="distance">Distance (km)</InputLabel>
                    <TextField
                      error={!!errors.distance}
                      helperText={errors.distance?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Straighten />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="calories"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="calories">Calories</InputLabel>
                    <TextField
                      error={!!errors.calories}
                      helperText={errors.calories?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocalFireDepartment />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="avgPace"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="avgPace">Average Pace</InputLabel>
                    <TextField
                      error={!!errors.avgPace}
                      helperText={errors.avgPace?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTime />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="avgSpeed"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="avgSpeed">Average Speed</InputLabel>
                    <TextField
                      error={!!errors.avgSpeed}
                      helperText={errors.avgSpeed?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Speed />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="avgHeartRate"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="avgHeartRate">
                      Average Heart Rate
                    </InputLabel>
                    <TextField
                      error={!!errors.avgHeartRate}
                      helperText={errors.avgHeartRate?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <FavoriteBorder />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="maxHeartRate"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="maxHeartRate">
                      Maximum Heart Rate
                    </InputLabel>
                    <TextField
                      error={!!errors.maxHeartRate}
                      helperText={errors.maxHeartRate?.message}
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Favorite />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <TextField
                      error={!!errors.category}
                      helperText={errors.category?.message}
                      {...field}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Category />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                )}
              />
            </Grid>
            <Button type="submit">Submit</Button>
          </Grid>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
