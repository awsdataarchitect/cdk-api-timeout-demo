# Open-source demo project implementation of API Gateway with longer integration timeouts using AWS-CDK

This is a CDK project written in TypeScript to demo how to implement API Gateway requiring longer timeouts than 29 seconds for your workloads such as Generative AI uses cases with LLMs.

For more details on how to deploy the infrastructure and the solution details, please refer to the [Blog Post](https://medium.com/@vivek-aws/using-api-gateway-for-generative-ai-uses-cases-with-llms-or-workloads-requiring-longer-timeouts-a265cb4d5a15).


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
