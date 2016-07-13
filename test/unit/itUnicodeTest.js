describe('itesoft.filter:itUnicode Test', function () {
    var $filter;
    // load the service's module
    beforeEach(module('itesoft'));



    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('"itesoft" should be converted to html unicode', function () {
        var itUnicode = $filter('itUnicode');
        expect(itUnicode('itesoft')=='&#x0069;&#x0074;&#x0065;&#x0073;&#x006F;&#x0066;&#x0074;').toBe(true);
    });
});
