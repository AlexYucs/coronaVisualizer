const cdk = require('@aws-cdk/core');
const appSync = require('@aws-cdk/aws-appsync');
const dynamoDB = require('@aws-cdk/aws-dynamodb');
const graphqlAPI = require("@aws-cdk/aws-appsync/lib/graphqlapi");
const s3 = require('@aws-cdk/aws-s3');
const s3deploy = require('@aws-cdk/aws-s3-deployment');

class CoronaVisualizerStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, `${id}Bucket`, {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    new s3deploy.BucketDeployment(this, `${id}Deploy`, {
      sources: [ s3deploy.Source.asset('./dist') ],
      destinationBucket: websiteBucket,
    });

    const api = new appSync.GraphQLApi(this, `${id}API`, {
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
