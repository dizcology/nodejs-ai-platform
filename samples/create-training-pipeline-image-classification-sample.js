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
  datasetId,
  modelDisplayName
) {
  // [START aiplatform_create_training_pipeline_image_classification_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const datasetId = 'DATASET_ID';
  // const modelDisplayName = 'MODEL_DISPLAY_NAME';
  const { PipelineServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineImageClassificationSample() {
    const parent = `projects/${project}/locations/${location}`;

    const trainingTaskInputs = {
      structValue: {
        fields: {
          multiLabel: { boolValue: true },
          modelType: { stringValue: "CLOUD" },
          budgetMilliNodeHours: { numberValue: 8000 },
          disableEarlyStopping: { boolValue: false },
        },
      },
    };
    const trainingPipeline = {
      displayName,
      trainingTaskDefinition:
        "gs://google-cloud-aiplatform/schema/trainingjob/definition/automl_image_classification_1.0.0.yaml",
      trainingTaskInputs,
      inputDataConfig: {
        datasetId,
      },
      modelToUpload: {
        displayName: modelDisplayName,
      },
    };
    const request = {
      parent,
      trainingPipeline,
    };

    const [response] = await client.createTrainingPipeline(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createTrainingPipelineImageClassificationSample();
  // [END aiplatform_create_training_pipeline_image_classification_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
