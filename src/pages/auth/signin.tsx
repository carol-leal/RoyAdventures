import { signIn } from "next-auth/react";
import { Stack, Typography, Box, Button, Avatar } from "@mui/material";

export default function SignIn() {
  const providers = {
    google: {
      id: "google",
      name: "Google",
    },
    discord: {
      id: "discord",
      name: "Discord",
    },
  };

  const getProviderButtonStyle = (providerId: string) => {
    switch (providerId.toLowerCase()) {
      case "google":
        return {
          backgroundColor: "#4285f4",
          "&:hover": {
            backgroundColor: "#357ae8",
          },
          boxShadow: "0 4px 12px rgba(66, 133, 244, 0.3)",
        };
      case "discord":
        return {
          backgroundColor: "#5865F2",
          "&:hover": {
            backgroundColor: "#4752C4",
          },
          boxShadow: "0 4px 12px rgba(88, 101, 242, 0.3)",
        };
      default:
        return {
          backgroundColor: "#333",
          "&:hover": {
            backgroundColor: "#555",
          },
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        };
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/libertalia.jpg")',
        height: "100vh",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: { xs: "2rem", sm: "3rem" },
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Avatar
            alt="Roy"
            src="/Roy.png"
            sx={{ width: 80, height: 80, marginBottom: "1rem" }}
          />
          <Typography
            variant="h2"
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
            Sign <span style={{ color: "#1E90FF" }}>In</span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.1rem",
              marginBottom: "1rem",
            }}
          >
            Join Roy on his epic adventure through Libertalia
          </Typography>

          <Stack spacing={2} sx={{ width: "100%" }}>
            {Object.values(providers).map((provider) => (
              <Button
                key={provider.id}
                variant="contained"
                size="large"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                sx={{
                  ...getProviderButtonStyle(provider.id),
                  padding: "12px 24px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Sign in with {provider.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
