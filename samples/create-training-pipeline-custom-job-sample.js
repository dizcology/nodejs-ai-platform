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
  containerImageUri,
  baseOutputDirectoryPrefix
) {
  // [START aiplatform_create_training_pipeline_custom_job_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const modelDisplayName = 'MODEL_DISPLAY_NAME';
  // const containerImageUri = 'CONTAINER_IMAGE_URI';
  // const baseOutputDirectoryPrefix = 'BASE_OUTPUT_DIRECTORY_PREFIX';
  const { PipelineServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineCustomJobSample() {
    const parent = `projects/${project}/locations/${location}`;

    const trainingTaskInputs = {
      structValue: {
        fields: {
          workerPoolSpecs: {
            listValue: {
              values: [
                {
                  structValue: {
                    fields: {
                      replicaCount: { numberValue: 1 },
                      machineSpec: {
                        structValue: {
                          fields: {
                            machineType: { stringValue: "n1-standard-4" },
                          },
                        },
                      },
                      containerSpec: {
                        structValue: {
                          fields: {
                            // A working docker image can be found at gs://cloud-samples-data/ai-platform/mnist_tfrecord/custom_job
                            imageUri: { stringValue: containerImageUri },
                            args: {
                              listValue: {
                                values: [
                                  // AIP_MODEL_DIR is set by the service according to baseOutputDirectory.
                                  {
                                    stringValue: "--model_dir=$(AIP_MODEL_DIR)",
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          baseOutputDirectory: {
            structValue: {
              fields: {
                // The GCS location for outputs must be accessible by the project's AI Platform service account.
                output_uri_prefix: { stringValue: baseOutputDirectoryPrefix },
              },
            },
          },
        },
      },
    };
    const trainingTaskDefinition =
      "gs://google-cloud-aiplatform/schema/trainingjob/definition/custom_task_1.0.0.yaml";
    const imageUri = "gcr.io/cloud-aiplatform/prediction/tf-cpu.1-15:latest";
    const trainingPipeline = {
      displayName,
      trainingTaskDefinition,
      trainingTaskInputs,
      modelToUpload: {
        displayName: modelDisplayName,
        containerSpec: {
          imageUri,
        },
      },
    };
    const request = {
      parent,
      trainingPipeline,
    };

    const [response] = await client.createTrainingPipeline(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createTrainingPipelineCustomJobSample();
  // [END aiplatform_create_training_pipeline_custom_job_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
