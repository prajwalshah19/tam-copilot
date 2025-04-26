import os
from tam_copilot_sdk import FoundryClient
from foundry_sdk_runtime.auth import UserTokenAuth
import dotenv

auth = UserTokenAuth(hostname=os.getenv("FOUNDRY_HOSTNAME"), token=os.getenv("FOUNDRY_TOKEN"))

client = FoundryClient(auth=auth, hostname=os.getenv("FOUNDRY_HOSTNAME"))

