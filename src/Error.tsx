import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorMessage = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <Container sx={{ textAlign: "left" }}>
      <h1>Oops!</h1>
      <p>
        <i>{errorMessage}</i>
      </p>
      <Box sx={{ marginTop: 8 }}>
        <Button data-cy="back" variant="contained" color="primary" onClick={() => navigate("/")}>
          Back to home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
