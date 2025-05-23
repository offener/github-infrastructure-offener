#!/usr/bin/env python3
"""
Script to create an Azure resource group and storage account in a specified subscription.

Usage:
  python create_azure_resources.py <subscription_id> <resource_group> <location> <storage_account>

Requirements:
  pip install azure-mgmt-resource azure-mgmt-storage azure-identity

This script uses Azure CLI authentication (az login).
"""
import sys
import os
from azure.identity import AzureCliCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.storage import StorageManagementClient


def main():
    if len(sys.argv) != 5:
        print("Usage: python create_azure_resources.py <subscription_id> <resource_group> <location> <storage_account>")
        sys.exit(1)

    subscription_id = sys.argv[1]
    resource_group = sys.argv[2]
    location = sys.argv[3]
    storage_account = sys.argv[4]

    credential = AzureCliCredential()

    # Create resource group
    resource_client = ResourceManagementClient(credential, subscription_id)
    print(f"Creating resource group '{resource_group}' in location '{location}'...")
    rg_result = resource_client.resource_groups.create_or_update(
        resource_group,
        {"location": location}
    )
    print(f"Resource group '{resource_group}' created.")

    # Create storage account
    storage_client = StorageManagementClient(credential, subscription_id)
    print(f"Creating storage account '{storage_account}' in resource group '{resource_group}'...")
    poller = storage_client.storage_accounts.begin_create(
        resource_group,
        storage_account,
        {
            "location": location,
            "sku": {"name": "Standard_LRS"},
            "kind": "StorageV2",
            "enable_https_traffic_only": True
        }
    )
    account_result = poller.result()
    print(f"Storage account '{storage_account}' created.")

if __name__ == "__main__":
    main()
