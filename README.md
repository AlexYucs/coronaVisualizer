# Serverless AWS CDK CoronaVisualizer

An AWS CDK project using Vue.js to model Coronavirus data for US States.

## Prerequisites:
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)


## AWS CDK Structures:
- Appsync for Graphql
- DynamoDB to store Covid-19 Data
- S3 Bucket for Static Hosting
- Lambda to scrape data from [NYT Github](https://github.com/nytimes/covid-19-data)
- Iam to get permissions for dynamodb:BatchWriteItem
- Events to set up a cron job for the Lambda function


## AWS Manual Setup Recommended:

At the time of writing this, the CDK instructions for these were experimental.
It was easier to set these up in AWS Console. 

- Route53 for custom domain name route to S3
- AWS Certificate Manager (ACM) for SSL Certificate
- Cloudfront to use the SSL for HTTPS


## Useful commands

 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template
 * `npm run upload`       batch write data from input.json into the dynamoDB
 * `npm run serve`        compiles and hot-reloads for development
 * `npm run build`        compiles and minifies for production
 * `npm run lint`         lints and fixes files
 * `npm run deploy`       build and deploy this stack to your default AWS account/region
 
 ## TODO
 - Mobility and Fatality Rate data section
 - New cases by day graph