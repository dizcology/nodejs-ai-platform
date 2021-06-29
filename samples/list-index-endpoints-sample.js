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

async function main(project, location) {
  // [START aiplatform_list_index_endpoints_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  const { IndexEndpointServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new IndexEndpointServiceClient(clientOptions);

  async function listIndexEndpointsSample() {
    const parent = `projects/${project}/locations/${location}`;

    const request = {
      parent,
    };

    const [response] = await client.listIndexEndpoints(request);

    for (const result of response) {
      console.log(`result: ${JSON.stringify(result, null, 2)}`);
    }
  }
  await listIndexEndpointsSample();
  // [END aiplatform_list_index_endpoints_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
