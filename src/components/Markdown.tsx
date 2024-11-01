import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useTheme } from "@mui/material";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import { OWNER_GITHUB_USERNAME, REPOSITORY_NAME } from "../constants";
import "highlight.js/styles/github-dark-dimmed.css";

const removeMarkdownComments = (markdownText: string) =>
  markdownText.replace(/<!--[\s\S]*?-->/g, "");

interface MarkdownProps {
  content: string;
}

export const Markdown = ({ content }: MarkdownProps) => {
  const theme = useTheme();

  return (
    <ReactMarkdown
      rehypePlugins={[[rehypeHighlight, { detect: true }]]}
      remarkPlugins={[
        remarkGfm,
        [
          remarkGithub,
          { repository: `${OWNER_GITHUB_USERNAME}/${REPOSITORY_NAME}` },
        ],
      ]}
      components={{
        img: ({ node, ...props }) => (
          <img {...props} style={{ maxWidth: "100%" }} />
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;

          if (isInline) {
            return (
              <code
                style={{
                  backgroundColor: theme.palette.grey[700],
                  color: theme.palette.text.primary,
                  padding: "0.2em 0.4em",
                  borderRadius: "3px",
                  fontSize: "0.8em",
                }}
                {...props}>
                {children}
              </code>
            );
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}>
      {removeMarkdownComments(content)}
    </ReactMarkdown>
  );
};
