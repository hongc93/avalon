var fs = require('fs');
// karma start karma.sauce
module.exports = function(config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (process.env.SAUCE_USERNAME) {
        console.log('使用全局的sauce key')
    } else {
        if (!fs.existsSync('sauce.json')) {
            console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
            process.exit(1);
        } else {
            console.log('使用sauce.json!')
            process.env.SAUCE_USERNAME = require('./sauce').username;
            process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
        }
    }
    // https://saucelabs.com/platforms
    // Browsers to run on Sauce Labs
    var customLaunchers = {

        SL_IE_8: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '8',
            platform: 'Windows XP'

        },
        'SL_IE_9': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 2008',
            version: '9'
        },
        'SL_IE_10': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 2012',
            version: '10'
        },
        'SL_IE_11': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        Edge13: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            version: '13.10586',
            platform: 'Windows 10',
        },
        Edge14: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            version: '14.14393',
            platform: 'Windows 10',
        },
        sl_opera11_win7: {
            "browserName": "Opera",
            "platform": "Windows 7",
            "version": "11"
        },
        sl_opera12_win7: {
            "browserName": "Opera",
            "platform": "Windows 7",
            "version": "12"
        },
        chrome_54: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '54.0',
            platform: 'Windows 10'
        },
        chrome_53: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '53.0',
            platform: 'Windows 10'
        },
        chrome_52: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '52.0',
            platform: 'Windows 10'
        },
        chrome_51: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '51.0',
            platform: 'Windows 10'
        },
        chrome50: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '50.0',
            platform: 'Windows 10'
        },
        chrome40: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '40.0',
            platform: 'Windows 10'
        },
        chrome30: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '30.0',
            platform: 'Windows 10'
        },
        //chrome最低只支持到26

        'Firefox26': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '26',
            platform: 'Windows 10',
        },
        firefox40: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '40.0',
            platform: 'Windows 10',
        },
        firefox_48: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '48.0',
            platform: 'Windows 10',
        },
        // Safari (last 2 versions)

        sl_safari_9: {
            base: 'SauceLabs',
            browserName: 'Safari',
            version: '9.0',
            platform: 'OS X 10.11',
        },
        sl_safari_8: {
            base: 'SauceLabs',
            browserName: 'Safari',
            version: '8.0',
            platform: 'OS X 10.10',
        },
        // iOS (last 2 major versions)

        sl_ios_9: {
            base: 'SauceLabs',
            browserName: 'Safari',
            appiumVersion: '1.5.3',
            deviceName: 'iPhone Simulator',
            deviceOrientation: 'portrait',
            platformVersion: '9.3',
            platformName: 'iOS',
        },
        sl_ios_8: {
            base: 'SauceLabs',
            browserName: 'Safari',
            appiumVersion: '1.5.3',
            deviceName: 'iPhone Simulator',
            deviceOrientation: 'portrait',
            platformVersion: '8.4',
            platformName: 'iOS'
        },
        iphone_latest: {
            base: 'SauceLabs',
            browserName: 'iphone'
        },
        android_latest: {
            base: 'SauceLabs',
            browserName: 'android'
        }
    };

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            './test/promise.js',
            './test/matchers.js',
            './test/beforeIt.js',
            './dist/avalon.sauce.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'saucelabs'],


        // web server port
        port: 9876,

        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        sauceLabs: {
            testName: 'avalon2.2.2',
            //recordScreenshots: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            },
            public: 'public'
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};