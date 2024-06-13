import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkApiTimeoutDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const imageProcessor = new lambda.Function(this, 'ImageProcessor', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'image_processor.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: cdk.Duration.seconds(60), 
    });

    // Define the API Gateway with regional endpoint
    const api = new apigateway.RestApi(this, 'ImageProcessorApi', {
      restApiName: 'Image Processor Service',
      description: 'This service processes images.',
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL], // Set the endpoint to regional
      },
    });

    // Integrate the Lambda function with the API Gateway
    const getImageProcessingIntegration = new apigateway.LambdaIntegration(imageProcessor, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
      //timeout: cdk.Duration.seconds(35), // This throws Error: Integration timeout must be between 50 milliseconds and 29 seconds.
      integrationResponses: [
        {
          statusCode: '200',
          responseTemplates: {
            'application/json': ''
          }
        }
      ]
    });

    // Create a resource and method for the API
    const imageProcessorResource = api.root.addResource('process-image');
    const imageProcessorMethod = imageProcessorResource.addMethod('GET', getImageProcessingIntegration, {
      methodResponses: [
        {
          statusCode: '200',
          responseModels: {
            'application/json': apigateway.Model.EMPTY_MODEL
          }
        }
      ]
    });

    // Override the timeout on integration using CfnMethod.
    const cfnMethod = imageProcessorMethod.node.findChild('Resource') as apigateway.CfnMethod;

    // see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apitgateway-method-integration.html#cfn-apigateway-method-integration-timeoutinmillis
    cfnMethod.addPropertyOverride("Integration.TimeoutInMillis", cdk.Duration.seconds(35).toMilliseconds())

    // Output the API endpoint URL
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      description: 'The URL of the API Gateway endpoint',
    });
  }
}
