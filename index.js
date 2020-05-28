const core = require('@actions/core');
const fs = require('fs');
const path = require('path')
const yaml = require('js-yaml');


function getVersion() {
    const pathToFile = path.resolve('src/main/resources/application.yml')
    console.log('Const path to file: ', pathToFile);
    const file = fs.readFileSync(pathToFile, 'utf8');
    const doc = yaml.safeLoad(file);

    if (!doc.version) {
        core.setFailed('Branch is not supported');
        return;
    }

    return doc.version;

}

try {
    console.log('Setting version...');
    const version = getVersion();
    console.log('Result: ', version);
    core.setOutput('version', version);
} catch (e) {
    console.error(e);
    core.setFailed(e.message);
}
