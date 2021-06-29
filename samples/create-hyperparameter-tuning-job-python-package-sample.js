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
  executorImageUri,
  packageUri,
  pythonModule
) {
  // [START aiplatform_create_hyperparameter_tuning_job_python_package_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const executorImageUri = 'EXECUTOR_IMAGE_URI';
  // const packageUri = 'PACKAGE_URI';
  // const pythonModule = 'PYTHON_MODULE';
  const { JobServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new JobServiceClient(clientOptions);

  async function createHyperparameterTuningJobPythonPackageSample() {
    const parent = `projects/${project}/locations/${location}`;

    // study_spec
    const metric = {
      metricId: "val_rmse",
      goal: "MINIMIZE",
    };
    const conditionalParameterDecay = {
      parameterSpec: {
        parameterId: "decay",
        doubleValueSpec: {
          minValue: 1e-7,
          maxValue: 1,
        },
        scaleType: "UNIT_LINEAR_SCALE",
      },
      parentDiscreteValues: {
        values: [32, 64],
      },
    };
    const conditionalParameterLearningRate = {
      parameterSpec: {
        parameterId: "learning_rate",
        doubleValueSpec: {
          minValue: 1e-7,
          maxValue: 1,
        },
        scaleType: "UNIT_LINEAR_SCALE",
      },
      parentDiscreteValues: {
        values: [4, 8, 16],
      },
    };
    const parameter = {
      parameterId: "batch_size",
      discreteValueSpec: {
        values: [4, 8, 16, 32, 64, 128],
      },
      scaleType: "UNIT_LINEAR_SCALE",
      conditionalParameterSpecs: [
        conditionalParameterDecay,
        conditionalParameterLearningRate,
      ],
    };
    // trial_job_spec
    const machineSpec = {
      machineType: "n1-standard-4",
      acceleratorType: "NVIDIA_TESLA_K80",
      acceleratorCount: 1,
    };
    const workerPoolSpec = {
      machineSpec,
      replicaCount: 1,
      pythonPackageSpec: {
        executorImageUri,
        packageUris: [packageUri],
        pythonModule,
        args: [],
      },
    };
    // hyperparameter_tuning_job
    const hyperparameterTuningJob = {
      displayName,
      maxTrialCount: 4,
      parallelTrialCount: 2,
      studySpec: {
        metrics: [metric],
        parameters: [parameter],
        algorithm: "RANDOM_SEARCH",
      },
      trialJobSpec: {
        workerPoolSpecs: [workerPoolSpec],
      },
    };
    const request = {
      parent,
      hyperparameterTuningJob,
    };

    const [response] = await client.createHyperparameterTuningJob(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createHyperparameterTuningJobPythonPackageSample();
  // [END aiplatform_create_hyperparameter_tuning_job_python_package_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
