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

async function main(project, location, endpoint, filename) {
  // [START aiplatform_predict_image_classification_sample]
  // const project = 'PROJECT';
  // const location = 'LOCATION';
  // const endpoint = 'ENDPOINT';
  // const filename = 'FILENAME';
  const { PredictionServiceClient } = require("@google-cloud/aiplatform");
  // The AI Platform services require regional API endpoints.
  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const client = new PredictionServiceClient(clientOptions);

  async function predictImageClassificationSample() {
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpoint}`;

    const fs = require("fs");
    const content = fs.readFileSync(filename);

    const encodedContent = Buffer.from(content).toString("base64");

    const instance = {
      structValue: {
        fields: {
          content: { stringValue: encodedContent },
        },
      },
    };
    const instances = [instance];
    // See gs://google-cloud-aiplatform/schema/predict/params/image_classification_1.0.0.yaml for the format of the parameters.
    const parameters = {
      structValue: {
        fields: {
          confidenceThreshold: { numberValue: 0.5 },
          maxPredictions: { numberValue: 5 },
        },
      },
    };
    const request = {
      endpoint,
      instances,
      parameters,
    };

    const [response] = await client.predict(request);
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
  }
  await predictImageClassificationSample();
  // [END aiplatform_predict_image_classification_sample]
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
