import { useState } from "react";
import { Issue } from "../types/issue";
import {
  Box,
  Collapse,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Markdown } from "./Markdown";

interface Props {
  issue: Issue;
}

const containerStyles: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  mb: 2,
  p: 2,
  wordBreak: "break-word",
  borderRadius: 1,
  border: "1px solid",
  borderColor: "divider",
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
});

const headerStyles: SxProps<Theme> = {
  cursor: "pointer",
  gap: "5px",
};

const expandIconStyles: SxProps = {
  transition: "transform 0.3s ease",
};

const contentStyles: SxProps<Theme> = (theme) => ({
  maxHeight: "50vh",
  overflowY: "auto",
  backgroundColor: theme.palette.background.default,
});

export const IssueItem = ({ issue: { title, number, body } }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box sx={containerStyles}>
      <Box
        display="flex"
        alignItems="center"
        sx={headerStyles}
        onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}>
        <IconButton
          sx={{
            ...expandIconStyles,
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}>
          <ExpandMoreIcon />
        </IconButton>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">{title}</Typography>
          <Typography fontSize="1rem" color="grey">{`#${number}`}</Typography>
        </Box>
      </Box>
      <Collapse in={isExpanded}>
        <Box mt={2} sx={contentStyles} pl={2} pr={2}>
          <Markdown content={body} />
        </Box>
      </Collapse>
    </Box>
  );
};
