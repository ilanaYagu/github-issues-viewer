import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "./theme";
import { Box, Container, Typography } from "@mui/material";
import { IssueList } from "./components/IssueList";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Box py={4} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" p={2}>
            GitHub LakeFS Issues
          </Typography>
          <IssueList />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
