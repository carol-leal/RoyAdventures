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
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { createExerciseSchema, type ExerciseFormData } from "~/types/exercise";

type ResponsiveDialogProps = {
  open: boolean;
  onClose: (value: boolean) => void;
};

const predefinedCategories = [
  { id: "running", name: "Running" },
  { id: "cycling", name: "Cycling" },
  { id: "swimming", name: "Swimming" },
  { id: "walking", name: "Walking" },
  { id: "rowing", name: "Rowing" },
  { id: "hiking", name: "Hiking" },
  { id: "skiing", name: "Skiing" },
  { id: "skating", name: "Skating" },
  { id: "strength", name: "Strength Training" },
  { id: "yoga", name: "Yoga" },
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

  const categories = [...predefinedCategories, ...userCategories];

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
      name: "",
      time: 0,
      distance: undefined,
      calories: undefined,
      avgPace: undefined,
      avgSpeed: undefined,
      avgHeartRate: undefined,
      maxHeartRate: undefined,
      categoryId: "",
      customCategory: "",
    },
  });

  const selectedCategoryId = watch("categoryId");
  const selectedCustomCategory = watch("customCategory");

  const onSubmit = (data: ExerciseFormData) => {
    createExercise.mutate({
      ...data,
      categoryId: selectedCategoryId ?? undefined,
      customCategory: selectedCategoryId ? undefined : selectedCustomCategory,
    });
    handleClose();
  };

  const handleClose = () => {
    onClose(false);
    reset({
      name: "",
      time: 0,
      distance: undefined,
      calories: undefined,
      avgPace: undefined,
      avgSpeed: undefined,
      avgHeartRate: undefined,
      maxHeartRate: undefined,
      categoryId: "",
      customCategory: "",
    });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="add-exercise-dialog-title">
          Add New Exercise
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fill out the information below to log your activity.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
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
                <InputLabel htmlFor="categoryId">Category</InputLabel>
                <Select
                  id="categoryId"
                  label="Category"
                  value={selectedCategoryId}
                  onChange={(e) => {
                    // manually update form state
                    const value = e.target.value;
                    // update via setValue to trigger `watch`
                    setValue("categoryId", value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Category />
                    </InputAdornment>
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {selectedCategoryId === "" && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="customCategory">
                    Custom Category
                  </InputLabel>
                  <OutlinedInput
                    id="customCategory"
                    label="Custom Category"
                    {...register("customCategory")}
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
