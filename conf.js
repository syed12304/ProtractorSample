var jasmineReporters = require('jasmine-reporters');
exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts:{
		  grep : ''
  },
	directConnect: true,
  capabilities:{
        'browserName': 'chrome',
	  'chromeOptions': {
         'args': ['no-sandbox']
     },
    },

  specs:['testSpec.js'],
}
