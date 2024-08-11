// // const fs = require('fs');
// // const path = require('path');
// // const { exec } = require('child_process');

// // const outputPath = path.join(__dirname, 'outputs');
// // if (!fs.existsSync(outputPath)) {
// //     fs.mkdirSync(outputPath, { recursive: true });
// // }

// // const executeJava = async (filePath, inputPath) => {
// //     const jobId = path.basename(filePath).split(".")[0];
// //     const className = path.basename(filePath).split(".")[0];
// //     const command = `javac ${filePath} && java -cp ${path.dirname(filePath)} ${className}`;
// //     const executeCommand = inputPath ? `${command} < ${inputPath}` : command;

// //     return new Promise((resolve, reject) => {
// //         exec(executeCommand, (error, stdout, stderr) => {
// //             if (error) {
// //                 reject({ error, stderr });
// //             } else if (stderr) {
// //                 reject(stderr);
// //             } else {
// //                 resolve(stdout);
// //             }
// //         });
// //     });
// // };

// // module.exports = executeJava;

// const fs = require('fs');
// const path = require('path');
// const { exec } = require('child_process');

// const outputPath = path.join(__dirname, 'outputs');
// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeJava = async (filePath) => {
//     const jobId = path.basename(filePath).split(".")[0];
//     const className = path.basename(filePath).split(".")[0];
    
//     return new Promise((resolve, reject) => {
//         // Compile the Java file
//         exec(`javac ${filePath}`, (compileError, stdout, stderr) => {
//             if (compileError) {
//                 reject({ error: compileError.message, stderr });
//                 return;
//             }
            
//             // Run the compiled class file
//             exec(`java -cp ${path.dirname(filePath)} ${className}`, (runError, runStdout, runStderr) => {
//                 if (runError) {
//                     reject({ error: runError.message, stderr: runStderr });
//                     return;
//                 }
//                 resolve(runStdout);
//             });
//         });
//     });
// };

// module.exports = executeJava;

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = async (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const className = path.basename(filePath).split(".")[0];
    
    return new Promise((resolve, reject) => {
        // Compile the Java file
        exec(`javac ${filePath}`, (compileError, stdout, stderr) => {
            if (compileError) {
                reject({ error: compileError.message, stderr });
                return;
            }
            
            // Run the compiled class file
            exec(`java -cp ${path.dirname(filePath)} ${className}`, (runError, runStdout, runStderr) => {
                if (runError) {
                    reject({ error: runError.message, stderr: runStderr });
                    return;
                }
                resolve(runStdout);
            });
        });
    });
};

module.exports = executeJava;

