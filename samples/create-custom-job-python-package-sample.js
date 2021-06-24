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
  packageExecutorImageUri,
  gcsPythonPackageUri
) {
  // [START aiplatform_create_custom_job_python_package_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const packageExecutorImageUri = 'PACKAGE_EXECUTOR_IMAGE_URI';
  // const gcsPythonPackageUri = 'GCS_PYTHON_PACKAGE_URI';
  const { JobServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new JobServiceClient(clientOptions);

  async function createCustomJobPythonPackageSample() {
    const parent = `projects/${project}/locations/${location}`;

    const customJob = {
      displayName,
      jobSpec: {
        workerPoolSpecs: [
          {
            machineSpec: {
              machineType: "n1-standard-2",
              acceleratorType: "NVIDIA_TESLA_K80",
              acceleratorCount: 1,
            },
            replicaCount: 1,
            pythonPackageSpec: {
              executorImageUri: packageExecutorImageUri,
              packageUris: [gcsPythonPackageUri],
            },
          },
        ],
      },
    };
    const request = {
      parent,
      customJob,
    };

    const [response] = await client.createCustomJob(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createCustomJobPythonPackageSample();
  // [END aiplatform_create_custom_job_python_package_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
