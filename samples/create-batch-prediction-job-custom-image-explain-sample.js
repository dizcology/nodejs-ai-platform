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
  modelName,
  instancesFormat,
  gcsSourceUri,
  predictionsFormat,
  gcsDestinationOutputUriPrefix
) {
  // [START aiplatform_create_batch_prediction_job_custom_image_explain_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const modelName = 'MODEL_NAME';
  // const instancesFormat = 'INSTANCES_FORMAT';
  // const gcsSourceUri = 'GCS_SOURCE_URI';
  // const predictionsFormat = 'PREDICTIONS_FORMAT';
  // const gcsDestinationOutputUriPrefix = 'GCS_DESTINATION_OUTPUT_URI_PREFIX';
  const { JobServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new JobServiceClient(clientOptions);

  async function createBatchPredictionJobCustomImageExplainSample() {
    const parent = `projects/${project}/locations/${location}`;

    const modelParameters = { structValue: { fields: {} } };
    const batchPredictionJob = {
      displayName,
      // Format: 'projects/{project}/locations/{location}/models/{model_id}'
      model: modelName,
      modelParameters,
      inputConfig: {
        instancesFormat,
        gcsSource: {
          uris: [gcsSourceUri],
        },
      },
      outputConfig: {
        predictionsFormat,
        gcsDestination: {
          outputUriPrefix: gcsDestinationOutputUriPrefix,
        },
      },
      dedicatedResources: {
        machineSpec: {
          machineType: "n1-standard-2",
          acceleratorType: "NVIDIA_TESLA_K80",
          acceleratorCount: 1,
        },
        startingReplicaCount: 1,
        maxReplicaCount: 1,
      },
      generateExplanation: true,
    };
    const request = {
      parent,
      batchPredictionJob,
    };

    const [response] = await client.createBatchPredictionJob(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createBatchPredictionJobCustomImageExplainSample();
  // [END aiplatform_create_batch_prediction_job_custom_image_explain_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
