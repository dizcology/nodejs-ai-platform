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

async function main(project, location, featurestore, entityType, feature) {
  // [START aiplatform_get_feature_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const featurestore = 'FEATURESTORE';
  // const entityType = 'ENTITY_TYPE';
  // const feature = 'FEATURE';
  const { FeaturestoreServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new FeaturestoreServiceClient(clientOptions);

  async function getFeatureSample() {
    const name = `projects/${project}/locations/${location}/featurestores/${featurestore}/entityTypes/${entity_type}/features/${feature}`;

    const request = {
      name,
    };

    const [response] = await client.getFeature(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await getFeatureSample();
  // [END aiplatform_get_feature_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
