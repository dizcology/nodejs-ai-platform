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
  targetColumn,
  timeSeriesIdentifierColumn,
  timeColumn,
  staticColumns,
  timeVariantPastOnlyColumns,
  timeVariantPastAndFutureColumns,
  forecastWindowEnd
) {
  // [START aiplatform_create_training_pipeline_tabular_forecasting_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const datasetId = 'DATASET_ID';
  // const modelDisplayName = 'MODEL_DISPLAY_NAME';
  // const targetColumn = 'TARGET_COLUMN';
  // const timeSeriesIdentifierColumn = 'TIME_SERIES_IDENTIFIER_COLUMN';
  // const timeColumn = 'TIME_COLUMN';
  // const staticColumns = 'STATIC_COLUMNS';
  // const timeVariantPastOnlyColumns = 'TIME_VARIANT_PAST_ONLY_COLUMNS';
  // const timeVariantPastAndFutureColumns = 'TIME_VARIANT_PAST_AND_FUTURE_COLUMNS';
  // const forecastWindowEnd = 'FORECAST_WINDOW_END';
  const { PipelineServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineTabularForecastingSample() {
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
                      column_name: { stringValue: "date" },
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
                      column_name: { stringValue: "state_name" },
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
                      column_name: { stringValue: "county_fips_code" },
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
                      column_name: { stringValue: "confirmed_cases" },
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
                      column_name: { stringValue: "deaths" },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    };
    const period = {
      structValue: {
        fields: {
          unit: { stringValue: "day" },
          quantity: { numberValue: 1 },
        },
      },
    };
    // the inputs should be formatted according to the training_task_definition yaml file
    const trainingTaskInputs = {
      structValue: {
        fields: {
          // required inputs
          targetColumn: { stringValue: targetColumn },
          timeSeriesIdentifierColumn: {
            stringValue: timeSeriesIdentifierColumn,
          },
          timeColumn: { stringValue: timeColumn },
          transformations: transformations,
          period: period,
          optimizationObjective: { stringValue: "minimize-rmse" },
          trainBudgetMilliNodeHours: { numberValue: 8000 },
          staticColumns: { stringValue: staticColumns },
          timeVariantPastOnlyColumns: {
            stringValue: timeVariantPastOnlyColumns,
          },
          timeVariantPastAndFutureColumns: {
            stringValue: timeVariantPastAndFutureColumns,
          },
          forecastWindowEnd: { stringValue: forecastWindowEnd },
        },
      },
    };
    const trainingPipeline = {
      displayName,
      trainingTaskDefinition:
        "gs://google-cloud-aiplatform/schema/trainingjob/definition/automl_forecasting_1.0.0.yaml",
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
  await createTrainingPipelineTabularForecastingSample();
  // [END aiplatform_create_training_pipeline_tabular_forecasting_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
