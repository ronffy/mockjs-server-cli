const commander = require('commander');
const program = new commander.Command();

program
  .version(require('../package.json').version)
  .description('For more information, see https://github.com/ronffy/mockjs-server-cli.')
  .option('-p, --port', 'server port')
  .option('--config', 'path to the mock config file')

program.parse(process.argv);

module.exports = program;
