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

async function main(project, location, endpoint, instanceDict) {
  // [START aiplatform_explain_custom_tabular_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const endpoint = 'ENDPOINT';
  // const instanceDict = 'INSTANCE_DICT';
  const { PredictionServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PredictionServiceClient(clientOptions);

  async function explainCustomTabularSample() {
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpoint}`;

    const instances = [instance];
    // custom models do not have additional parameters
    const parameters = { structValue: { fields: {} } };
    // This works when there is only one deployed model.
    const deployedModelId = null;
    const request = {
      endpoint,
      instances,
      parameters,
      deployedModelId,
    };

    const [response] = await client.explain(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await explainCustomTabularSample();
  // [END aiplatform_explain_custom_tabular_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
