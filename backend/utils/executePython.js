const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const executePython = async (filePath, inputPath) => {
    const command = `python ${filePath}`;
    const executeCommand = inputPath ? `${command} < ${inputPath}` : command;

    return new Promise((resolve, reject) => {
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

module.exports = executePython;
