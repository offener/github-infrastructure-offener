# Foundation

A storage account is required to maintain the terraform states, which has to be created before we can using cdktf. This part of the repository uses a python script to setup the initial storage container.

```bash
az login --tenant <add tenant id>

pip install -r requirements.txt

python3 create_azure_resources.py <subscription id> tfstate-offener-gh-rg norwayeast tfstategh
```
