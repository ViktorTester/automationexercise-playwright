const fs = require('node:fs');
const { ensureResultsExist, reportDir, resultsDir, runAllureCommand } = require('./allure-common.cjs');

async function main() {
  ensureResultsExist();

  if (!fs.existsSync(reportDir)) {
    await runAllureCommand(['generate', resultsDir, '--clean', '-o', reportDir]);
  }

  await runAllureCommand(['open', reportDir]);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
