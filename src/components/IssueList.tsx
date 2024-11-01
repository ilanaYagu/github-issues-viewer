import { ChangeEvent, useState } from "react";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { IssueItem } from "./IssueItem";
import { useGitHubIssues } from "../hooks/useGitHubIssues";
import { OWNER_GITHUB_USERNAME, REPOSITORY_NAME } from "../constants";

export const IssueList = () => {
  const [page, setPage] = useState(1);
  const { issues, loading, error, totalPages } = useGitHubIssues({
    owner: OWNER_GITHUB_USERNAME,
    repo: REPOSITORY_NAME,
    page,
  });

  if (loading) return <CircularProgress color="inherit" />;
  if (error) return <Typography>{error}</Typography>;

  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) =>
    setPage(newPage);

  return (
    <Box width="100%">
      {issues.length > 0 ? (
        issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
      ) : (
        <Typography textAlign="center" mt={3}>
          No Issues Found
        </Typography>
      )}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
        />
      </Box>
    </Box>
  );
};
