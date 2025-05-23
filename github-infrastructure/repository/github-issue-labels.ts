import { Construct } from "constructs";
import { IssueLabel } from "@cdktf/provider-github/lib/issue-label";

export interface DefaultLabel {
  name: string;
  color: string;
  description: string;
}

export const defaultLabels: DefaultLabel[] = [
  { name: "bug", color: "d73a4a", description: "Something isn't working" },
  { name: "documentation", color: "0075ca", description: "Improvements or additions to documentation" },
  { name: "duplicate", color: "cfd3d7", description: "This issue or pull request already exists" },
  { name: "enhancement", color: "a2eeef", description: "New feature or request" },
  { name: "invalid", color: "e4e669", description: "This doesn't seem right" },
  { name: "question", color: "d876e3", description: "Further information is requested" },
  { name: "wontfix", color: "ffffff", description: "This will not be worked on" }
];

export function createDefaultIssueLabels(scope: Construct, repository: string) {
  return defaultLabels.map(label =>
    new IssueLabel(scope, `${repository}-${label.name}-label`, {
      repository,
      name: label.name,
      color: label.color,
      description: label.description,
    })
  );
}
