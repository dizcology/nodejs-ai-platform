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
  // [START aiplatform_create_training_pipeline_tabular_regression_sample]
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

  async function createTrainingPipelineTabularRegressionSample() {
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
                      column_name: {
                        stringValue: "STRING_5000unique_NULLABLE",
                      },
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
                      column_name: {
                        stringValue: "INTEGER_5000unique_NULLABLE",
                      },
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
                      column_name: { stringValue: "FLOAT_5000unique_NULLABLE" },
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
                      column_name: { stringValue: "FLOAT_5000unique_REPEATED" },
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
                      column_name: {
                        stringValue: "NUMERIC_5000unique_NULLABLE",
                      },
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
                      column_name: { stringValue: "BOOLEAN_2unique_NULLABLE" },
                    },
                  },
                },
              },
            },
          },
          {
            structValue: {
              fields: {
                timestamp: {
                  structValue: {
                    fields: {
                      column_name: {
                        stringValue: "TIMESTAMP_1unique_NULLABLE",
                      },
                      invalid_values_allowed: { boolValue: true },
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
                      column_name: { stringValue: "DATE_1unique_NULLABLE" },
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
                      column_name: { stringValue: "TIME_1unique_NULLABLE" },
                    },
                  },
                },
              },
            },
          },
          {
            structValue: {
              fields: {
                timestamp: {
                  structValue: {
                    fields: {
                      column_name: { stringValue: "DATETIME_1unique_NULLABLE" },
                      invalid_values_allowed: { boolValue: true },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.STRING_5000unique_NULLABLE",
                      },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.INTEGER_5000unique_NULLABLE",
                      },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.FLOAT_5000unique_NULLABLE",
                      },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.FLOAT_5000unique_REQUIRED",
                      },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.FLOAT_5000unique_REPEATED",
                      },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.NUMERIC_5000unique_NULLABLE",
                      },
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
                      column_name: {
                        stringValue: "STRUCT_NULLABLE.BOOLEAN_2unique_NULLABLE",
                      },
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
                      column_name: {
                        stringValue:
                          "STRUCT_NULLABLE.TIMESTAMP_1unique_NULLABLE",
                      },
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
          predictionType: { stringValue: "regression" },
          transformations: transformations,
          trainBudgetMilliNodeHours: { numberValue: 8000 },
          // optional inputs
          disableEarlyStopping: { boolValue: false },
          // supported regression optimisation objectives: minimize-rmse,
          // minimize-mae, minimize-rmsle
          optimizationObjective: { stringValue: "minimize-rmse" },
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
  await createTrainingPipelineTabularRegressionSample();
  // [END aiplatform_create_training_pipeline_tabular_regression_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
