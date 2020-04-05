const cdk = require('@aws-cdk/core');
const appSync = require('@aws-cdk/aws-appsync');
const dynamoDB = require('@aws-cdk/aws-dynamodb');
const graphqlAPI = require("@aws-cdk/aws-appsync/lib/graphqlapi");

class CoronaVisualizerStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const api = new appSync.GraphQLApi(this, 'Api', {
      name: `coronaStateAPI`,
      logConfig: {
        fieldLogLevel: graphqlAPI.FieldLogLevel.ALL,
      },
      authorizationConfig: {
        defaultAuthorization: {
          apiKeyDesc: 'AlexAPIKEY',
        },
      },
      schemaDefinitionFile: './schema/state.graphql',
    });

    //TODO fix schema structure for this table
    const stateTable = new dynamoDB.Table(this, 'StateTable', {
      billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamoDB.AttributeType.STRING,
      },
    });

    // anything more complex could be annoying? Looks easy for simple lookups though
    const stateDS = api.addDynamoDbDataSource('State', 'The state data source', stateTable);
    stateDS.createResolver({
      typeName: 'Query',
      fieldName: 'getState',
      requestMappingTemplate: graphqlAPI.MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: graphqlAPI.MappingTemplate.dynamoDbResultItem(),
    });
  }
}

module.exports = { CoronaVisualizerStack };
