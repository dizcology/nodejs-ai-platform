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

async function main(project, location, metadataStore, displayName, artifactId) {
  // [START aiplatform_create_artifact_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const metadataStore = 'METADATA_STORE';
  // const displayName = 'DISPLAY_NAME';
  // const artifactId = 'ARTIFACT_ID';
  const { MetadataServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new MetadataServiceClient(clientOptions);

  async function createArtifactSample() {
    const parent = `projects/${project}/locations/${location}/metadataStores/${metadata_store}`;

    const artifact = {
      displayName,
    };
    const request = {
      parent,
      artifact,
      artifactId,
    };

    const [response] = await client.createArtifact(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await createArtifactSample();
  // [END aiplatform_create_artifact_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
