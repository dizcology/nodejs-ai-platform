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

async function main(project, location, tensorboard, experiment, run) {
  // [START aiplatform_delete_tensorboard_run_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const tensorboard = 'TENSORBOARD';
  // const experiment = 'EXPERIMENT';
  // const run = 'RUN';
  const { TensorboardServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new TensorboardServiceClient(clientOptions);

  async function deleteTensorboardRunSample() {
    const name = `projects/${project}/locations/${location}/tensorboards/${tensorboard}/experiments/${experiment}/runs/${run}`;

    const request = {
      name,
    };

    const [response] = await client.deleteTensorboardRun(request);

    console.log(`Long running operation: ${response.name}`);

    // Wait for operation to complete.
    await response.promise();
    const result = response.result;
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
  }
  await deleteTensorboardRunSample();
  // [END aiplatform_delete_tensorboard_run_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
