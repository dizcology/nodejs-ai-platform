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
  modelDisplayName,
  targetColumn
) {
  // [START aiplatform_create_training_pipeline_tabular_classification_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const datasetId = 'DATASET_ID';
  // const modelDisplayName = 'MODEL_DISPLAY_NAME';
  // const targetColumn = 'TARGET_COLUMN';
  const { PipelineServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineTabularClassificationSample() {
    const parent = `projects/${project}/locations/${location}`;

    // set the columns used for training and their data types
    const transformations = {
      listValue: {
        values: [
          {
            structValue: {
              fields: {
                auto: {
                  structValue: {
                    fields: {
                      column_name: { stringValue: "sepal_width" },
                    },
                  },
                },
              },
            },
          },
          {
            structValue: {
              fields: {
                auto: {
                  structValue: {
                    fields: {
                      column_name: { stringValue: "sepal_length" },
                    },
                  },
                },
              },
            },
          },
          {
            structValue: {
              fields: {
                auto: {
                  structValue: {
                    fields: {
                      column_name: { stringValue: "petal_length" },
                    },
                  },
                },
              },
            },
          },
          {
            structValue: {
              fields: {
                auto: {
                  structValue: {
                    fields: {
                      column_name: { stringValue: "petal_width" },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    };
    const trainingTaskInputs = {
      structValue: {
        fields: {
          // required inputs
          targetColumn: { stringValue: targetColumn },
          predictionType: { stringValue: "classification" },
          transformations: transformations,
          trainBudgetMilliNodeHours: { numberValue: 8000 },
          // optional inputs
          disableEarlyStopping: { boolValue: false },
          // supported binary classification optimisation objectives:
          // maximize-au-roc, minimize-log-loss, maximize-au-prc,
          // maximize-precision-at-recall, maximize-recall-at-precision
          // supported multi-class classification optimisation objective:
          // minimize-log-loss
          optimizationObjective: { stringValue: "minimize-log-loss" },
        },
      },
    };
    const trainingPipeline = {
      displayName,
      trainingTaskDefinition:
        "gs://google-cloud-aiplatform/schema/trainingjob/definition/automl_tabular_1.0.0.yaml",
      trainingTaskInputs,
      inputDataConfig: {
        datasetId,
        fractionSplit: {
          trainingFraction: 0.8,
          validationFraction: 0.1,
          testFraction: 0.1,
        },
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
  await createTrainingPipelineTabularClassificationSample();
  // [END aiplatform_create_training_pipeline_tabular_classification_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
