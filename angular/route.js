
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            
        	controllerAs 	: 'listMatches',
        })
        .when('/match/:matchId',{
        	templateUrl     : 'views/singleMatch-view.html',
        	controller 		: 'singleMatchController',
        	controllerAs 	: 'currentMatch'
        })
        .when('/statistics',{

        	templateUrl     : 'views/matchStats-view.html',
        	controller 		: 'statisticsController',
        	controllerAs 	: 'getStats'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);