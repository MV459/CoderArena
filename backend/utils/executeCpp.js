// const fs = require('fs');
// const path = require('path');
// const { exec } = require('child_process');

// const outputPath = path.join(__dirname, 'outputs');
// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCpp = async (filePath, inputPath) => {
//     const jobId = path.basename(filePath).split(".")[0];
//     const outputFilename = `${jobId}.exe`;
//     const outPath = path.join(outputPath, outputFilename);

//     return new Promise((resolve, reject) => {
//         const command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename}`;
//         const executeCommand = inputPath ? `${command} < ${inputPath}` : command;

//         exec(executeCommand, (error, stdout, stderr) => {
//             if (error) {
//                 reject({ error, stderr });
//             } else if (stderr) {
//                 reject(stderr);
//             } else {
//                 resolve(stdout);
//             }
//         });
//     });
// };

// module.exports = executeCpp;

// const fs = require('fs');
// const path = require('path');
// const { exec } = require('child_process');
// const os = require('os');

// const outputPath = path.join(__dirname, 'outputs');
// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCpp = async (filePath, inputPath) => {
//     const jobId = path.basename(filePath).split(".")[0];
//     const outputFilename = `${jobId}${os.platform() === 'win32' ? '.exe' : ''}`;
//     const outPath = path.join(outputPath, outputFilename);

//     return new Promise((resolve, reject) => {
//         const isWindows = os.platform() === 'win32';

//         const command = isWindows 
//             ? `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename}`
//             : `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./$(basename ${outPath})`;

//         const executeCommand = inputPath ? `${command} < ${inputPath}` : command;

//         exec(executeCommand, (error, stdout, stderr) => {
//             if (error) {
//                 reject({ error, stderr });
//             } else if (stderr) {
//                 reject(stderr);
//             } else {
//                 resolve(stdout);
//             }
//         });
//     });
// };

// module.exports = executeCpp;

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

const outputPath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputPath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outputFilename = `${jobId}${os.platform() === 'win32' ? '.exe' : ''}`;
    const outPath = path.join(outputPath, outputFilename);

    return new Promise((resolve, reject) => {
        const isWindows = os.platform() === 'win32';

        const command = isWindows 
            ? `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename}`
            : `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./$(basename ${outPath})`;

        const executeCommand = inputPath ? `${command} < ${inputPath}` : command;

        exec(executeCommand, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

module.exports = executeCpp;
