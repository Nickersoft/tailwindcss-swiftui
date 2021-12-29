import chalk from "chalk";

function log(chalk, message) {
  console.warn(chalk, "-", message);
}

export default {
  info(message) {
    log(chalk.bold.cyan("info"), message);
  },
  warn(message) {
    log(chalk.bold.yellow("warn"), message);
  },
  risk(message) {
    log(chalk.bold.magenta("risk"), message);
  },
};
