import json
import boto3
from boto3 import resource
from boto3.dynamodb.conditions import Key


dynamodb_resource = resource('dynamodb')

# dynamodb_client = boto3.client('dynamodb', region_name="us-east-1")
table = dynamodb_resource.Table('AB3-AppointmentList')

def lambda_handler(event, context):
    
    user_mail = event['headers']['user_mail']
    
    def query_table(table_name, key=None, value=None):
        if key is not None and value is not None:
            filtering_exp = Key(key).eq(value)
            return table.query(KeyConditionExpression=filtering_exp)
    
        raise ValueError('Parametros faltantes ou invalidos')

    try:
        final_response = response['Item']
    except:
        final_response = "nenhuma informacao encontrada para os dados fornecidas"
        
        
    resp = query_table(
        table_name=table, 
        key='user_email', 
        value=user_mail
    )
    items = resp.get('Items')
    print(len(items))
    
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
