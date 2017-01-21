describe('RESULTS CONTROLLER TEST SUITE: -> ', function(){

    var results = {
	   "Search":[
	      {
	         "Title":"Star Wars: Episode IV - A New Hope",
	         "Year":"1977",
	         "imdbID":"tt0076759",
	         "Type":"movie"
	      },
	      {
	         "Title":"Star Wars: Episode V - The Empire Strikes Back",
	         "Year":"1980",
	         "imdbID":"tt0080684",
	         "Type":"movie"
	      },
	      {
	         "Title":"Star Wars: Episode VI - Return of the Jedi",
	         "Year":"1983",
	         "imdbID":"tt0086190",
	         "Type":"movie"
	      }
	  ]
	};

    var $controller, $scope, $q, $rootScope, $location, OMDBService;

    beforeEach(angular.mock.module('movieApp'));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _OMDBService_, _$location_){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        $rootScope = _$rootScope_;
        OMDBService = _OMDBService_;
        $location = _$location_;
    }));

    it('should load search results', function() {
        // Mock 'search' method in data service to return the data we want (above) without worrying about inner functionality
        spyOn(OMDBService, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });

        $location.search('q', 'star wars'); // this will simulate a change in route with a parameter of q -> 'star wars'
        $controller('ResultsController', {$scope: $scope});
        $scope.$apply(); // resolves the promise
        expect(OMDBService.search).toHaveBeenCalledWith('star wars');
    });
});