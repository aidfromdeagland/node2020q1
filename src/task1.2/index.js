'use strict';

const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const { pipeline } = require('stream');
const csvToJson = require('csvtojson');

const csvFilePath = path.join(__dirname, '/csv/nodejs-hw1-ex1.csv');
const jsonFilePath = path.join(__dirname, '/json/nodejs-hw1-ex1.json');
const txtFilePath = path.join(__dirname, '/txt/nodejs-hw1-ex1.txt');

const errorHandler = (error) => {
    console.error(error.message);
};

const checkPathExistance = (path) => {
    return fsPromises.access(path)
        .then(() => true)
        .catch(() => false);
};

const truncateFile = (filePath) => {
    return fsPromises.truncate(filePath, 0)
        .catch((err) => errorHandler(err));
};

const prepareOutputforConvertation = (outputPath) => {
    const outputDirectory = path.dirname(outputPath);

    return checkPathExistance(outputDirectory)
    .then((doesPathExist) => {
        if (doesPathExist) {
            return checkPathExistance(outputPath);
        } else {
            return fsPromises.mkdir(outputDirectory, { recursive: true })
            .then(() => checkPathExistance(outputPath));
        }
    })
    .then((doesFileExist) => {
        if (doesFileExist) {
            return truncateFile(outputPath);
        }
    })
    .catch((err) => errorHandler(err));
};

const convertCsvToJson = (csvPath, jsonPath) => {
    return  csvToJson()
    .fromFile(csvPath)
    .then((json) => {
        return fsPromises.writeFile(jsonPath, JSON.stringify(json, null, 2));
    })
    .catch((err) => errorHandler(err));
};

const convertCsvToTxtLineByLine = (csvPath, txtPath) => {
    pipeline(
        csvToJson()
        .fromFile(csvPath)
        .subscribe((jsonLine) => {
            return new Promise((resolve) => {
                resolve(jsonLine);
            })
        })
        .on('error', (err) => {
            errorHandler(err);
        }),
        fs.createWriteStream(txtPath),
        (err) => {
            if (err) {
                errorHandler(err);
            }
        }
    );
};

const convertAccordingToTask = (inputPath, outputPath, handler) => {
    prepareOutputforConvertation(outputPath)
    .then(() => {
        return handler(inputPath, outputPath);
    })
    .catch((err) => errorHandler(err));
}

convertAccordingToTask(csvFilePath, jsonFilePath, convertCsvToJson);
convertAccordingToTask(csvFilePath, txtFilePath, convertCsvToTxtLineByLine);

