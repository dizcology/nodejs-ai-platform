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

async function main(project, location, model, gcsDestinationOutputUriPrefix) {
  // [START aiplatform_export_model_tabular_classification_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const model = 'MODEL';
  // const gcsDestinationOutputUriPrefix = 'GCS_DESTINATION_OUTPUT_URI_PREFIX';
  const { ModelServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new ModelServiceClient(clientOptions);

  async function exportModelTabularClassificationSample() {
    const name = `projects/${project}/locations/${location}/models/${model}`;

    const gcsDestination = {
      outputUriPrefix: gcsDestinationOutputUriPrefix,
    };
    const outputConfig = {
      artifactDestination: gcsDestination,
      exportFormatId: "tf-saved-model",
    };
    const request = {
      name,
      outputConfig,
    };

    const [response] = await client.exportModel(request);

    console.log(`Long running operation: ${response.name}`);

    // Wait for operation to complete.
    await response.promise();
    const result = response.result;
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
  }
  await exportModelTabularClassificationSample();
  // [END aiplatform_export_model_tabular_classification_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
