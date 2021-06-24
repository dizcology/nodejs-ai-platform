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
  modelDisplayName,
  datasetId,
  annotationSchemaUri,
  trainingContainerSpecImageUri,
  modelContainerSpecImageUri,
  baseOutputUriPrefix
) {
  // [START aiplatform_create_training_pipeline_custom_training_managed_dataset_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const modelDisplayName = 'MODEL_DISPLAY_NAME';
  // const datasetId = 'DATASET_ID';
  // const annotationSchemaUri = 'ANNOTATION_SCHEMA_URI';
  // const trainingContainerSpecImageUri = 'TRAINING_CONTAINER_SPEC_IMAGE_URI';
  // const modelContainerSpecImageUri = 'MODEL_CONTAINER_SPEC_IMAGE_URI';
  // const baseOutputUriPrefix = 'BASE_OUTPUT_URI_PREFIX';
  const { PipelineServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineCustomTrainingManagedDatasetSample() {
    const parent = `projects/${project}/locations/${location}`;

    // input_data_config
    const inputDataConfig = {
      datasetId,
      annotationSchemaUri,
      gcsDestination: {
        outputUriPrefix: baseOutputUriPrefix,
      },
    };
    // training_task_definition
    const customTaskDefinition =
      "gs://google-cloud-aiplatform/schema/trainingjob/definition/custom_task_1.0.0.yaml";
    // training_task_inputs
    const trainingContainerSpec = {
      structValue: {
        fields: {
          imageUri: { stringValue: trainingContainerSpecImageUri },
          // AIP_MODEL_DIR is set by the service according to baseOutputDirectory.
          args: {
            listValue: {
              values: [{ stringValue: "--model-dir=$(AIP_MODEL_DIR)" }],
            },
          },
        },
      },
    };
    const trainingWorkerPoolSpec = {
      structValue: {
        fields: {
          replicaCount: { numberValue: 1 },
          machineSpec: {
            structValue: {
              fields: {
                machineType: { stringValue: "n1-standard-8" },
              },
            },
          },
          containerSpec: trainingContainerSpec,
        },
      },
    };
    const trainingTaskInputs = {
      structValue: {
        fields: {
          workerPoolSpecs: { listValue: { values: [trainingWorkerPoolSpec] } },
          baseOutputDirectory: {
            structValue: {
              fields: {
                outputUriPrefix: { stringValue: baseOutputUriPrefix },
              },
            },
          },
        },
      },
    };
    // model_to_upload
    const modelContainerSpec = {
      imageUri: modelContainerSpecImageUri,
      command: [],
      args: [],
    };
    const model = {
      displayName: modelDisplayName,
      containerSpec: modelContainerSpec,
    };
    const trainingPipeline = {
      displayName,
      inputDataConfig,
      trainingTaskDefinition: customTaskDefinition,
      trainingTaskInputs,
      modelToUpload: model,
    };
    const request = {
      parent,
      trainingPipeline,
    };

    const [response] = await client.createTrainingPipeline(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createTrainingPipelineCustomTrainingManagedDatasetSample();
  // [END aiplatform_create_training_pipeline_custom_training_managed_dataset_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
