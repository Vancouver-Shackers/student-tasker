from configparser import SectionProxy
from azure.identity import DeviceCodeCredential, ClientSecretCredential, InteractiveBrowserCredential
from msgraph.core import GraphClient

class Graph:
    settings: SectionProxy
    interative_browser_credential: InteractiveBrowserCredential
    device_code_credential: DeviceCodeCredential
    user_client: GraphClient
    client_credential: ClientSecretCredential
    app_client: GraphClient

    def __init__(self, config: SectionProxy):
        self.settings = config
        client_id = self.settings['clientId']
        client_secret = self.settings['clientSecret']
        tenant_id = self.settings['authTenant']
        scopes = self.settings['scopes'].split(' ')

        self.device_code_credential = DeviceCodeCredential(client_id, tenant_id = tenant_id)
        # self.interative_browser_credential = InteractiveBrowserCredential()

        self.user_client = GraphClient(credential=self.device_code_credential, scopes=scopes)
        # self.user_client = GraphClient(credential=self.interative_browser_credential, scopes=graph_scopes)


    def get_assignments(self):
        # endpoint = '/education/me/assignments'
        endpoint = '/me/todo/lists'
        
        request_url = f'{endpoint}'
        assignment_response = self.user_client.get(request_url)
        return assignment_response.json()