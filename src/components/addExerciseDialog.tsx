import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Select,
  Grid,
} from "@mui/material";
import React from "react";
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
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { createExerciseSchema, type ExerciseFormData } from "~/types/exercise";

type ResponsiveDialogProps = {
  open: boolean;
  onClose: (value: boolean) => void;
};

const predefinedCategories = [
  { category: "Elliptical" },
  { category: "Running" },
  { category: "Cycling" },
  { category: "Swimming" },
  { category: "Walking" },
  { category: "Rowing" },
  { category: "Hiking" },
  { category: "Skiing" },
  { category: "Skating" },
  { category: "Strength Training" },
  { category: "Yoga" },
];

export default function AddExerciseDialog({
  open,
  onClose,
}: ResponsiveDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const createExercise = api.exercise.create.useMutation();
  const { data: userCategories = [] } =
    api.exercise.getAllCategories.useQuery();

  const categories = userCategories
    ? [...predefinedCategories, ...userCategories]
    : predefinedCategories;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: undefined,
      time: 0,
      distance: undefined,
      calories: undefined,
      avgPace: undefined,
      avgSpeed: undefined,
      avgHeartRate: undefined,
      maxHeartRate: undefined,
      category: undefined,
      date: new Date(),
    },
  });

  const onError: SubmitErrorHandler<ExerciseFormData> = (errors) =>
    console.log("errors:", errors);

  const selectedCategory = watch("category");

  const onSubmit = (data: ExerciseFormData) => {
    createExercise.mutate(
      { ...data },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error("Failed to create exercise:", error);
        },
      },
    );
  };

  const handleClose = () => {
    onClose(false);
    reset();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="add-exercise-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <DialogTitle id="add-exercise-dialog-title">
          Add New Exercise
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fill out the information below to log your activity.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Exercise Name</InputLabel>
                <OutlinedInput
                  id="name"
                  label="Exercise Name"
                  startAdornment={
                    <InputAdornment position="start">
                      <DirectionsRun />
                    </InputAdornment>
                  }
                  {...register("name")}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="time">Time (minutes)</InputLabel>
                <OutlinedInput
                  id="time"
                  label="Time (minutes)"
                  type="number"
                  inputProps={{
                    min: 0,
                    onKeyDown: (e) => {
                      if (
                        ![
                          "Backspace",
                          "Delete",
                          "Tab",
                          "Escape",
                          "Enter",
                          "ArrowLeft",
                          "ArrowRight",
                        ].includes(e.key) &&
                        !/[0-9]/.test(e.key)
                      ) {
                        e.preventDefault();
                      }
                    },
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccessTime />
                    </InputAdornment>
                  }
                  {...register("time", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="distance">Distance (meters)</InputLabel>
                <OutlinedInput
                  id="distance"
                  label="Distance (meters)"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <Straighten />
                    </InputAdornment>
                  }
                  {...register("distance", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="calories">Calories Burned</InputLabel>
                <OutlinedInput
                  id="calories"
                  label="Calories Burned"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <LocalFireDepartment />
                    </InputAdornment>
                  }
                  {...register("calories", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="avgPace">Avg. Pace (min/km)</InputLabel>
                <OutlinedInput
                  id="avgPace"
                  label="Avg. Pace (min/km)"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <Speed />
                    </InputAdornment>
                  }
                  {...register("avgPace", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="avgSpeed">Avg. Speed (km/h)</InputLabel>
                <OutlinedInput
                  id="avgSpeed"
                  label="Avg. Speed (km/h)"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">
                      <Speed />
                    </InputAdornment>
                  }
                  {...register("avgSpeed", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="avgHeartRate">Avg. Heart Rate</InputLabel>
                <OutlinedInput
                  id="avgHeartRate"
                  label="Avg. Heart Rate"
                  type="number"
                  inputProps={{ step: 1 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <FavoriteBorder />
                    </InputAdornment>
                  }
                  {...register("avgHeartRate", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="maxHeartRate">Max Heart Rate</InputLabel>
                <OutlinedInput
                  id="maxHeartRate"
                  label="Max Heart Rate"
                  type="number"
                  inputProps={{ step: 1 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Favorite />
                    </InputAdornment>
                  }
                  {...register("maxHeartRate", { valueAsNumber: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="date">Date</InputLabel>
                <OutlinedInput
                  id="date"
                  label="Exercise Date"
                  type="date"
                  startAdornment={
                    <InputAdornment position="start">
                      <CalendarToday />
                    </InputAdornment>
                  }
                  {...register("date", { valueAsDate: true })}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="categoryId">Category</InputLabel>
                <Select
                  id="categoryId"
                  label="Category"
                  value={selectedCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("category", value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Category />
                    </InputAdornment>
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat.category ?? ""}
                      value={cat.category ?? ""}
                    >
                      {cat.category ?? ""}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {selectedCategory === "" && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="customCategory">
                    Custom Category
                  </InputLabel>
                  <OutlinedInput
                    id="customCategory"
                    label="Custom Category"
                    {...register("category")}
                  />
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
