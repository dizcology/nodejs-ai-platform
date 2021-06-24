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

async function main(modelName, newDisplayName) {
  // [START aiplatform_update_model_sample]
  // const modelName = 'MODEL_NAME';
  // const newDisplayName = 'NEW_DISPLAY_NAME';
  const { ModelServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new ModelServiceClient(clientOptions);

  async function updateModelSample() {
    const model = {
      name: modelName,
      displayName: newDisplayName,
    };
    const updateMask = {
      paths: ["display_name"],
    };
    const request = {
      model,
      updateMask,
    };

    const [response] = await client.updateModel(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await updateModelSample();
  // [END aiplatform_update_model_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
