import * as pulumi from "@pulumi/pulumi";
import * as github from "@pulumi/github";

const ghRepoName = "github-infrastructure-offener";

const offenerGithubRepo = new github.Repository(ghRepoName, {
    name: ghRepoName,
    description: "Github Configuration of offener Github repositories",
    visibility: "public",
    allowSquashMerge: true,
    allowMergeCommit: true,
    deleteBranchOnMerge: true,
    hasWiki: true,
});