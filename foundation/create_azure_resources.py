import sys
from azure.identity import AzureCliCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.storage import StorageManagementClient
from azure.storage.blob import BlobServiceClient


def main():
    if len(sys.argv) != 5:
        print("Usage: python create_azure_resources.py <subscription_id> <resource_group> <location> <storage_account>")
        sys.exit(1)

    subscription_id = sys.argv[1]
    resource_group = sys.argv[2]
    location = sys.argv[3]
    storage_account = sys.argv[4]

    credential = AzureCliCredential()

    resource_client = ResourceManagementClient(credential, subscription_id)
    print(f"Creating resource group '{resource_group}' in location '{location}'...")
    _ = resource_client.resource_groups.create_or_update(
        resource_group,
        {"location": location}
    )
    print(f"Resource group '{resource_group}' created.")

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
    _ = poller.result()
    print(f"Storage account '{storage_account}' created.")

    keys = storage_client.storage_accounts.list_keys(resource_group, storage_account)
    storage_keys = {v.key_name: v.value for v in keys.keys}
    storage_account_key = storage_keys["key1"]

    blob_service_client = BlobServiceClient(
        f"https://{storage_account}.blob.core.windows.net",
        credential=storage_account_key
    )
    container_name = "tfstates"
    print(f"Creating blob container '{container_name}' in storage account '{storage_account}'...")
    blob_service_client.create_container(container_name)
    print(f"Blob container '{container_name}' created.")

if __name__ == "__main__":
    main()
