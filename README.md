# Github Infrastructure Offener

This repository manages the GitHub infrastructure for the user `offener` using [CDK for Terraform (CDKTF)](https://developer.hashicorp.com/terraform/cdktf) and TypeScript. 

## Structure

- `github-infrastructure/` — CDKTF project for managing GitHub repositories, branch protection, and related settings.
- `foundation/` — Scripts and requirements for provisioning Azure resources (e.g., storage for Terraform state).

## Prerequisites

Refer to the devcontainer [dockerfile](./.devcontainer/dockerfile) for the required software

## Getting Started

1. **Set up environment variables:** Copy the .env.template file and rename it `.env`, and fill it out
2. **Provision the foundation Azure resources (optional):** If you need to create the Azure storage backend, follow the guid in [foundation/README.md](./foundation/README.md):
3. **Synthesize Terraform configuration:** Now you can work with the cdktf via the terminal, e.g.,
   
```bash
cd github-infrastructure

cdktf diff
```
