const { ensureResultsExist, reportDir, resultsDir, runAllureCommand } = require('./allure-common.cjs');

async function main() {
  ensureResultsExist();
  await runAllureCommand(['serve', resultsDir, '--host', '127.0.0.1', '-o', reportDir]);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
