import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { GithubProvider } from "@cdktf/provider-github/lib/provider";
import { AzurermBackend } from "cdktf";
import { createGithubRepository } from "../repository/github-repository";
import { createGithubBranchProtection } from "../repository/github-repository-ruleset";
import { createDefaultIssueLabels } from "../repository/github-issue-labels";

export class GithubInfrastructure extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const repositoryName = "github-infrastructure-offener";

    new AzurermBackend(this, {
      resourceGroupName: process.env.AZURE_RESOURCE_GROUP_NAME!,
      storageAccountName: process.env.AZURE_STORAGE_ACCOUNT_NAME!,
      containerName: process.env.AZURE_CONTAINER_NAME!,
      key: process.env.AZURE_TFSTATE_KEY!,
    });

    new GithubProvider(this, 'GitHub', {
      token: process.env.GITHUB_TOKEN,
      owner: 'offener',
    });

    const repository = createGithubRepository(this, 'github-infrastructure-offener', {
      name: repositoryName,
      description: 'Github Configuration of offener Github repositories',
    });

    createDefaultIssueLabels(this, repositoryName);
    createGithubBranchProtection(this, 'main-branch-protection', repository.name);
  }
}
