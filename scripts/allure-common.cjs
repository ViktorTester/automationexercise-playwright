const fs = require('node:fs');
const path = require('node:path');
const allure = require('allure-commandline');

const projectRoot = path.resolve(__dirname, '..');
const resultsDir = path.join(projectRoot, 'artifacts', 'allure-results');
const reportDir = path.join(projectRoot, 'artifacts', 'allure-report');

function ensureResultsExist() {
  if (!fs.existsSync(resultsDir)) {
    throw new Error(
      `Allure results were not found at ${resultsDir}. Run "npm test" first to generate them.`
    );
  }
}

function runAllureCommand(args) {
  return new Promise((resolve, reject) => {
    const child = allure(args, { stdio: 'inherit' });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('exit', (exitCode) => {
      if (exitCode === 0) {
        resolve();
        return;
      }

      reject(new Error(`Allure command failed with exit code ${exitCode ?? 'unknown'}.`));
    });
  });
}

module.exports = {
  reportDir,
  resultsDir,
  ensureResultsExist,
  runAllureCommand,
};
