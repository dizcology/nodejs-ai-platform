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

async function main(project, location, dataset, dataItem) {
  // [START aiplatform_list_annotations_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const dataset = 'DATASET';
  // const dataItem = 'DATA_ITEM';
  const { DatasetServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new DatasetServiceClient(clientOptions);

  async function listAnnotationsSample() {
    const parent = `projects/${project}/locations/${location}/datasets/${dataset}/dataItems/${data_item}`;

    const request = {
      parent,
    };

    const [response] = await client.listAnnotations(request);

    for (const result of response) {
      console.log(`result: ${JSON.stringify(result, null, 2)}`);
    }
  }
  await listAnnotationsSample();
  // [END aiplatform_list_annotations_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
