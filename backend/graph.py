import json
from configparser import SectionProxy
from azure.identity import DeviceCodeCredential, ClientSecretCredential
from msgraph.core import GraphClient

class Graph:
    settings: SectionProxy
    device_code_credential: DeviceCodeCredential
    user_client: GraphClient
    client_credential: ClientSecretCredential
    app_client: GraphClient

    def __init__(self, config: SectionProxy):
        self.settings = config
        client_id = self.settings['clientId']
        tenant_id = self.settings['authTenant']
        graph_scopes = self.settings['graphUserScopes'].split(' ')

        self.device_code_credential = DeviceCodeCredential(client_id, tenant_id = tenant_id)
        self.user_client = GraphClient(credential=self.device_code_credential, scopes=graph_scopes)

    def get_user_token(self):
        graph_scopes = self.settings['graphUserScopes']
        access_token = self.device_code_credential.get_token(graph_scopes)
        return access_token.token

    def get_user(self):
        endpoint = '/me'
        # Only request specific properties
        select = 'displayName,mail,userPrincipalName'
        request_url = f'{endpoint}?$select={select}'

        user_response = self.user_client.get(request_url)
        return user_response.json()

    def get_inbox(self):
        endpoint = '/me/mailFolders/inbox/messages'
        # Only request specific properties
        select = 'from,isRead,receivedDateTime,subject'
        # Get at most 25 results
        top = 25
        # Sort by received time, newest first
        order_by = 'receivedDateTime DESC'
        request_url = f'{endpoint}?$select={select}&$top={top}&$orderBy={order_by}'

        inbox_response = self.user_client.get(request_url)
        return inbox_response.json()

    def send_mail(self, subject: str, body: str, recipient: str):
        request_body = {
            'message': {
                'subject': subject,
                'body': {
                    'contentType': 'text',
                    'content': body
                },
                'toRecipients': [
                    {
                        'emailAddress': {
                            'address': recipient
                        }
                    }
                ]
            }
        }

        request_url = '/me/sendmail'

        self.user_client.post(request_url,
                            data=json.dumps(request_body),
                            headers={'Content-Type': 'application/json'})