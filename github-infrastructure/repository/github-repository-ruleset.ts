import { Construct } from "constructs";
import { RepositoryRuleset, RepositoryRulesetConfig } from "@cdktf/provider-github/lib/repository-ruleset";

export function createGithubBranchProtection(scope: Construct, id: string, repositoryName: string): RepositoryRuleset {
  const config: RepositoryRulesetConfig = {
    repository: repositoryName,
    enforcement: "active",
    name: "main-protect",
    target: "branch",
    rules: {
      deletion: true,
    },
  };

  return new RepositoryRuleset(scope, id, config);
}
