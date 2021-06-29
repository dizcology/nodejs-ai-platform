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
  displayName,
  containerSpecImageUri,
  artifactUri
) {
  // [START aiplatform_upload_model_custom_container_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const containerSpecImageUri = 'CONTAINER_SPEC_IMAGE_URI';
  // const artifactUri = 'ARTIFACT_URI';
  const { ModelServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new ModelServiceClient(clientOptions);

  async function uploadModelCustomContainerSample() {
    const parent = `projects/${project}/locations/${location}`;

    const containerSpec = {
      imageUri: containerSpecImageUri,
      command: [],
      args: [],
    };
    const model = {
      displayName,
      // The artifact_uri should be the path to a GCS directory containing
      // saved model artifacts.  The bucket must be accessible for the
      // project's AI Platform service account and in the same region as
      // the api endpoint.
      artifactUri,
      containerSpec,
    };
    const request = {
      parent,
      model,
    };

    const [response] = await client.uploadModel(request);

    console.log(`Long running operation: ${response.name}`);

    // Wait for operation to complete.
    await response.promise();
    const result = response.result;
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
  }
  await uploadModelCustomContainerSample();
  // [END aiplatform_upload_model_custom_container_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
