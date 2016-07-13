'use strict';


describe('showcase Application', function() {

    it('should redirect root to #/api', function () {
        browser.get('/index.html');
        expect(browser.getLocationAbsUrl()).toBe('/api');
    });
});