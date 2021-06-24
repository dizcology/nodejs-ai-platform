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

async function main(project, location, endpoint, deployedModelId) {
  // [START aiplatform_undeploy_model_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const endpoint = 'ENDPOINT';
  // const deployedModelId = 'DEPLOYED_MODEL_ID';
  const { EndpointServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new EndpointServiceClient(clientOptions);

  async function undeployModelSample() {
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpoint}`;

    // If after the undeployment there is at least one deployed model remaining in the endpoint, traffic_split should be set to a mapping from remaining deployed models' ids to integer percentages that sum to 100.
    const trafficSplit = {};
    const request = {
      endpoint,
      deployedModelId,
      trafficSplit,
    };

    const [response] = await client.undeployModel(request);

    console.log(`Long running operation: ${response.name}`);

    // Wait for operation to complete.
    await response.promise();
    const result = response.result;
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
  }
  await undeployModelSample();
  // [END aiplatform_undeploy_model_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
