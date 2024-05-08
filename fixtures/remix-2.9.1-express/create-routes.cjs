const fs = require("fs");
const path = require("path");

// Configuration
const numberOfFiles = 5; // Number of dummy route files to create
const linesPerComponent = 2_000; // Lines of JSX per component

// Generate dummy loader with multiple S3 interactions
function generateLoader(fileIndex) {
  let loaderCode = `import { S3 } from 'aws-sdk';\n`;
  loaderCode += `const s3 = new S3();\n`;
  loaderCode += `export const loader = async () => {\n`;
  loaderCode += `  const requests = [];\n`;

  // Prepare multiple dummy S3 GET requests
  for (let i = 0; i < linesPerComponent; i++) {
    loaderCode += `  requests.push(s3.getObject({ Bucket: 'my-bucket', Key: 'file${fileIndex}_${i}.txt' }).promise());\n`;
  }

  // Use Promise.all to wait for all S3 GET requests
  loaderCode += `  const responses = await Promise.all(requests);\n`;
  loaderCode += `  return new Response(JSON.stringify(responses), { headers: { 'Content-Type': 'application/json' } });\n`;
  loaderCode += `};\n\n`;
  return loaderCode;
}

function generateAction(fileIndex) {
  let actionCode = `export const action = async () => {\n`;
  actionCode += `  const requests = [];\n`;

  // Prepare multiple dummy S3 GET requests
  for (let i = 0; i < linesPerComponent; i++) {
    actionCode += `  requests.push(s3.getObject({ Bucket: 'my-bucket', Key: 'file${fileIndex}_${i}.txt' }).promise());\n`;
  }

  // Use Promise.all to wait for all S3 GET requests
  actionCode += `  const responses = await Promise.all(requests);\n`;
  actionCode += `  return new Response(JSON.stringify(responses), { headers: { 'Content-Type': 'application/json' } });\n`;
  actionCode += `};\n\n`;
  return actionCode;
}

// Generate dummy JSX component
function generateDummyJSX(fileIndex) {
  let jsx = `export default function RouteComponent${fileIndex}() {\n  return (\n    <div>\n`;
  for (let i = 0; i < linesPerComponent; i++) {
    jsx += `      <p>Line ${i} in Route Component ${fileIndex}</p>\n`;
  }
  jsx += "    </div>\n  );\n}\n";
  return jsx;
}

// Create files in the specified directory
function createFiles() {
  for (let i = 0; i < numberOfFiles; i++) {
    const loader = generateLoader(i);
    const action = generateAction(i); // Ensure you have this function defined or reuse the earlier example
    const component = generateDummyJSX(i); // Ensure you have this function defined or reuse the earlier example
    const code = loader + action + component;
    const filePath = path.join(__dirname, `app/routes/my-route${i}.route.tsx`);
    fs.writeFileSync(filePath, code);
  }
  console.log("Remix route files with concurrent S3 interactions created.");
}

createFiles();
