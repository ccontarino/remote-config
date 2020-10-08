const { program } = require('commander');
program
    .option('-x, --share', 'Do not encrypt value')
    .option('-u, --public <path>', 'Public key path')
    .option('-r, --private <path>', 'Private key path')
    .option('-p, --passphrase <path>', 'Passphrase')
    .requiredOption('-n, --namespace <namespace>', 'Config namespace')
    .requiredOption('-k, --key <key>', 'Config key')
    .requiredOption('-v, --value <value>', 'Config value')
    .requiredOption('-h, --host <value>', 'Remote config server ip:port')
    .parse(process.argv);


const client = require('@wjsc/remote-config-client').init(
    program.host,
    program.passphrase,
    program.private,
    program.public
);

client.set( { 
        namespace: program.namespace , 
        key: program.key, 
        value: program.value,
        secure: !program.share
    }, 
    (err, config) => {
        err ? console.error(err) : console.log(config)
    }
);
