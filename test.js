'use strict';
const nanoTest  = new (require('nanoTest')).test({
    'progress_bar' : false,
    'debug_print'  : 'short'
});
let monthy = (require('./class.js')).base;


nanoTest.add(
    'connect',
    {
        'function':function(){
            monthy = (require('./class.js')).base;
            return true;

        },
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'monthy number',
    {
        'function':monthy,
        'options':[10000000]
    },
    '===',
    496
);

nanoTest.run();
