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

async function main(project, location, dataset, gcsSourceUri, importSchemaUri) {
  // [START aiplatform_import_data_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const dataset = 'DATASET';
  // const gcsSourceUri = 'GCS_SOURCE_URI';
  // const importSchemaUri = 'IMPORT_SCHEMA_URI';
  const { DatasetServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new DatasetServiceClient(clientOptions);

  async function importDataSample() {
    const name = `projects/${project}/locations/${location}/datasets/${dataset}`;

    // Here we use only one import config with one source
    const importConfigs = [
      {
        gcsSource: {
          uris: [gcsSourceUri],
        },
        importSchemaUri,
      },
    ];
    const request = {
      name,
      importConfigs,
    };

    const [response] = await client.importData(request);

    console.log(`Long running operation: ${response.name}`);

    // Wait for operation to complete.
    await response.promise();
    const result = response.result;
    console.log(`result: ${JSON.stringify(result, null, 2)}`);
  }
  await importDataSample();
  // [END aiplatform_import_data_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
