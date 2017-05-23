exports.config = {
 	directConnect: true,
  capabilities:{
        'browserName': 'chrome',
	  'chromeOptions': {
         'args': ['no-sandbox']
     },
    },

  specs:['testSpec.js'],
};
