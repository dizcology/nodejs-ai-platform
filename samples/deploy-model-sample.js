// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

async function main(
  project,
  location,
  endpoint,
  modelName,
  deployedModelDisplayName
) {
  // [START aiplatform_deploy_model_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const endpoint = 'ENDPOINT';
  // const modelName = 'MODEL_NAME';
  // const deployedModelDisplayName = 'DEPLOYED_MODEL_DISPLAY_NAME';
  const { EndpointServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new EndpointServiceClient(clientOptions);

  async function deployModelSample() {
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpoint}`;

    const deployedModel = {
      // format: 'projects/{project}/locations/{location}/models/{model}'
      model: modelName,
      displayName: deployedModelDisplayName,
      // AutoML Vision models require `automatic_resources` field
      // Other model types may require `dedicated_resources` field instead
      automaticResources: {
        minReplicaCount: 1,
        maxReplicaCount: 1,
      },
    };
    // key '0' assigns traffic for the newly deployed model
    // Traffic percentage values must add up to 100
    // Leave dictionary empty if endpoint should not accept any traffic
    const trafficSplit = {
      0: 100,
    };
    const request = {
      endpoint,
      deployedModel,
      trafficSplit,
    };

    const [response] = await client.deployModel(request);

    console.log(`Long running operation: ${response.name}`);

    // Wait for operation to complete.
    await response.promise();
    const result = response.result;
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
  }
  await deployModelSample();
  // [END aiplatform_deploy_model_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
