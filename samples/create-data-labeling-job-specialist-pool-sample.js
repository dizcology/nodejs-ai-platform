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
  dataset,
  specialistPool,
  instructionUri,
  inputsSchemaUri,
  annotationSpec
) {
  // [START aiplatform_create_data_labeling_job_specialist_pool_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const displayName = 'DISPLAY_NAME';
  // const dataset = 'DATASET';
  // const specialistPool = 'SPECIALIST_POOL';
  // const instructionUri = 'INSTRUCTION_URI';
  // const inputsSchemaUri = 'INPUTS_SCHEMA_URI';
  // const annotationSpec = 'ANNOTATION_SPEC';
  const { JobServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new JobServiceClient(clientOptions);

  async function createDataLabelingJobSpecialistPoolSample() {
    const parent = `projects/${project}/locations/${location}`;

    const inputs = {
      structValue: {
        fields: {
          annotation_specs: {
            listValue: { values: [{ stringValue: annotationSpec }] },
          },
        },
      },
    };
    const dataLabelingJob = {
      displayName,
      // Full resource name: projects/{project}/locations/{location}/datasets/{dataset_id}
      datasets: [dataset],
      labelerCount: 1,
      instructionUri,
      inputsSchemaUri,
      inputs,
      annotationLabels: {
        "aiplatform.googleapis.com/annotation_set_name":
          "data_labeling_job_specialist_pool",
      },
      // Full resource name: projects/{project}/locations/{location}/specialistPools/{specialist_pool_id}
      specialistPools: [specialistPool],
    };
    const request = {
      parent,
      dataLabelingJob,
    };

    const [response] = await client.createDataLabelingJob(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createDataLabelingJobSpecialistPoolSample();
  // [END aiplatform_create_data_labeling_job_specialist_pool_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
