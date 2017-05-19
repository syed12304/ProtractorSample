var jasmineReporters = require('jasmine-reporters');
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  jasmineNodeOpts:{
		  grep : ''
  },
  capabilities:{
        'browserName': 'chrome'
    },

  specs:['testspec.js'],

   onPrepare: function() {
	  var fs = require('fs-extra');

		fs.emptyDirSync('reports/', function (err) {
        if(err!=null)
				  console.log("error in cleaning the reports folder : "+err);
			});
			
			fs.ensureDir('reports/screenshots/',function(err){
        if(err!=null)
				  console.log("error in creating the screenshots folder in reports : "+err);
			});

			jasmine.getEnv().addReporter({
				specDone: function(result) {
					if (result.status == 'failed') {
						browser.getCapabilities().then(function (caps) {
							var browserName = caps.get('browserName');

							browser.takeScreenshot().then(function (png) {
								var stream = fs.createWriteStream('reports/screenshots/' + browserName + '-' + result.fullName+ '.png');
								stream.write(new Buffer(png, 'base64'));
								stream.end();
							});
						});
					}
				}
			});

      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			savePath: 'reports/',
			filePrefix: 'xmlresults'
		}));
   },
  onComplete: function() {
     var browserName, browserVersion;
     var capsPromise = browser.getCapabilities();

     capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');

        var HTMLReport = require('protractor-html-reporter');

        testConfig = {
            reportTitle: 'Test Execution Report',
            outputPath: './reports',
            screenshotPath: 'screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true
        };
        new HTMLReport().from('./reports/xmlresults.xml', testConfig);
    });
 }
}