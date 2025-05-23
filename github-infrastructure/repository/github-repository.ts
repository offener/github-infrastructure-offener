import { Construct } from "constructs";
import { Repository, RepositoryConfig } from "@cdktf/provider-github/lib/repository";
import { deepMerge } from "../helpers/config-helper";

export function createGithubRepository(scope: Construct, id: string, config: RepositoryConfig): Repository {
  const defaults: Partial<RepositoryConfig> = {
    visibility: "public",
    autoInit: false,
    deleteBranchOnMerge: true,
    hasWiki: true,
    hasIssues: true,
  };

  const mergedConfig: RepositoryConfig = deepMerge(defaults, config);

  return new Repository(scope, id, mergedConfig);
}
