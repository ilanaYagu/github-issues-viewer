import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import { Issue } from "../types/issue";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN, // for not getting API rate limited too fast - you can use your own token by running `REACT_APP_GITHUB_TOKEN="YOUR_TOKEN" npm start`
});

interface Props {
  owner: string;
  repo: string;
  page: number;
  itemsPerPage?: number;
}

interface FetchResult {
  issues: Issue[];
  loading: boolean;
  error?: string;
  totalPages: number;
}

const DEFAULT_VALUE_FETCH_RESULT: FetchResult = {
  issues: [],
  loading: false,
  error: "",
  totalPages: 1,
};

const extractTotalPageFromLinkHeader = (linkHeader?: string) => {
  if (!linkHeader) return;
  const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
  if (match) {
    return parseInt(match[1], 10);
  }
};

export const useGitHubIssues = ({
  owner,
  repo,
  page,
  itemsPerPage = 25,
}: Props) => {
  const [fetchResult, setFetchResult] = useState<FetchResult>(
    DEFAULT_VALUE_FETCH_RESULT
  );

  useEffect(() => {
    const fetchIssues = async (page: number) => {
      setFetchResult((prevResult) => ({
        ...prevResult,
        loading: true,
        error: "",
      }));

      try {
        const response = await octokit.rest.search.issuesAndPullRequests({
          q: `repo:${owner}/${repo} is:issue state:open`,
          per_page: itemsPerPage,
          page,
        });

        // here in extractTotalPageFromLinkHeader i extract the pagination info from headers and
        // update the total pages if it was sent(maybe suddenly the total page changed?)
        const totalPages = extractTotalPageFromLinkHeader(
          response.headers.link
        );

        setFetchResult((prevResult) => ({
          ...prevResult,
          issues: response.data.items.map(({ id, number, title, body }) => ({
            id,
            number,
            title,
            body: body || "No description provided",
          })),
          loading: false,
          ...(totalPages && { totalPages }),
        }));
      } catch (err) {
        setFetchResult((prevResult) => ({
          ...prevResult,
          error: "Failed to fetch issues",
          loading: false,
        }));
        console.error(err);
      }
    };

    fetchIssues(page);
  }, [page, owner, repo, itemsPerPage]);

  return fetchResult;
};
