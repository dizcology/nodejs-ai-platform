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

async function main(name, displayName) {
  // [START aiplatform_update_artifact_sample]
  // const name = 'NAME';
  // const displayName = 'DISPLAY_NAME';
  const { MetadataServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new MetadataServiceClient(clientOptions);

  async function updateArtifactSample() {
    const artifact = {
      name,
      displayName,
    };
    const updateMask = {
      paths: ["display_name"],
    };
    const request = {
      artifact,
      updateMask,
    };

    const [response] = await client.updateArtifact(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await updateArtifactSample();
  // [END aiplatform_update_artifact_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
