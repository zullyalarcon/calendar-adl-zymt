var concat = require('concat');

const files = [
    './dist/calendar-adl-zymt/runtime.js',
    './dist/calendar-adl-zymt/polyfills.js',
    './dist/calendar-adl-zymt/scripts.js',
    './dist/calendar-adl-zymt/main.js'
]

concat(files, './dist/calendar-zymt.js')
console.info('Elements created successfully!')