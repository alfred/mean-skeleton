describe("Unit Testing Examples", function() {
	var $httpBackend, $rootScope, $scope, createController, appCtrl;

	beforeEach(module('myApp'))
	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function() {
			return $controller('appCtrl', { '$scope': $scope });
		};
	}));

	it('Checking if the controller exists', function() {
		expect(createController()).toBeDefined();
	});
});
