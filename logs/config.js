const path = require('path');

const defaultDateDelimeterRegexp = /\//g;
const dateLocale = 'en-US';
const dateStringOutputOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

function getLogFileName() {
    const dateString = (new Date()).toLocaleDateString(dateLocale, dateStringOutputOptions);
    return `${dateString.replace(defaultDateDelimeterRegexp, '-')}.log`;
}

module.exports = (logLevel = 'debug') => {
    return {
        level: logLevel,
        get filename() {
            return path.resolve(__dirname, `${logLevel}/`, getLogFileName());
        }
    };
};

