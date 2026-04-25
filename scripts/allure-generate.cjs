const { ensureResultsExist, reportDir, resultsDir, runAllureCommand } = require('./allure-common.cjs');

async function main() {
  ensureResultsExist();
  await runAllureCommand(['generate', resultsDir, '--clean', '-o', reportDir]);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
