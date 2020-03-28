var myApp = angular.module('myApp', []);

myApp.controller('home-controller', function ($scope, $http) {

    $scope.sl = true;
    $scope.global = false;
    $scope.cardLabel = "In Sri Lanka";

    $scope.confirmed = true;
    $scope.new = false;

    var dates =[];
    var ln = [];
    var lc = [];
    var gn = [];
    var gc = [];

    var newData = [];
    var confData = [];

    $scope.changeToNew = function(){

        $scope.new = true;
        $scope.confirmed = false;
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            init($chart, dates, newData);

        }, delayInMilliseconds);
    };

    $scope.changeToConfirmed = function(){

        $scope.confirmed = true;
        $scope.new = false;

        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            init($chart, dates, confData);

        }, delayInMilliseconds);

    };

    $scope.changeToSl = function () {

        $scope.sl = true;
        $scope.global = false;

        $scope.stats = $scope.slStats;
        $scope.news = $scope.localNews;
        $scope.cardLabel = "In Sri Lanka";

        newData = ln;
        confData = lc;
        $scope.changeToConfirmed();

    };

    $scope.changeToGlobal = function () {

        $scope.sl = false;
        $scope.global = true;

        $scope.stats = $scope.globalStats;
        $scope.news = $scope.globalNews;
        $scope.cardLabel = "Globally";
        newData = gn;
        confData = gc;
        $scope.changeToConfirmed();


    };

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/stats/global'
    }).then(function successCallback(response) {

        $scope.globalStats=response.data;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/stats/sl'
    }).then(function successCallback(response) {

        $scope.slStats=response.data;
        $scope.stats = $scope.slStats;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/news/global/min'
    }).then(function successCallback(response) {

        $scope.globalNews=response.data;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/news/local/min'
    }).then(function successCallback(response) {

        $scope.localNews=response.data;
        $scope.news = $scope.localNews;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=dates'
    }).then(function successCallback(response) {

        dates=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });
    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=ln'
    }).then(function successCallback(response) {

        ln=response.data;
        newData = ln;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=gc'
    }).then(function successCallback(response) {

        gc=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=gn'
    }).then(function successCallback(response) {

        gn=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=lc'
    }).then(function successCallback(response) {

        lc=response.data;
        confData = lc;

        $scope.changeToConfirmed();




    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });



    var $chart = $('#chart-sales2-dark');


    // Methods

    function init($chart, chartLabels, chartData) {

        var salesChart = new Chart($chart, {
            type: 'line',
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            lineWidth: 1,
                            color: Charts.colors.gray[900],
                            zeroLineColor: Charts.colors.gray[900]
                        },
                        ticks: {
                            callback: function(value) {
                                if (!(value % 10)) {
                                    return value;
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            var label = data.datasets[item.datasetIndex].label || '';
                            var yLabel = item.yLabel;
                            var content = '';

                            if (data.datasets.length > 1) {
                                content += label;
                            }

                            content +=yLabel;
                            return content;
                        }
                    }
                }
            },
            data: {
                labels: [],
                datasets: [{
                    label: 'Performance',
                    data: []
                }]
            }
        });

        // Save to jQuery object

        $chart.data('chart', salesChart);
        var data2 = { "labels": chartLabels, "datasets": [{ "label": "Performance", "data": chartData}] };

        salesChart["config"]["data"] = data2; //<--- THIS WORKS!
        salesChart.update();

    };


    // Events






});

myApp.controller('news-controller', function ($scope, $http) {

    $scope.sl = true;
    $scope.global = false;
    $scope.cardLabel = "In Sri Lanka";

    $scope.changeToSl = function () {

        $scope.sl = true;
        $scope.global = false;

        $scope.news = $scope.localNews;
        $scope.cardLabel = "In Sri Lanka";


    };

    $scope.changeToGlobal = function () {

        $scope.sl = false;
        $scope.global = true;

        $scope.news = $scope.globalNews;
        $scope.cardLabel = "Globally";


    };

    $http({
        method: 'GET',
        url: 'http://localhost:8080/news/global'
    }).then(function successCallback(response) {

        $scope.globalNews=response.data;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/news/local'
    }).then(function successCallback(response) {

        $scope.localNews=response.data;
        $scope.news = $scope.localNews;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

});

myApp.controller('data-controller', function ($scope, $http) {

    $scope.sl = true;
    $scope.global = false;
    $scope.cardLabel = "In Sri Lanka";

    $scope.confirmed = true;
    $scope.new = false;

    var dates =[];
    var ln = [];
    var lc = [];
    var gn = [];
    var gc = [];

    var newData = [];
    var confData = [];

    $scope.changeToNew = function(){

        $scope.new = true;
        $scope.confirmed = false;
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            init($chart, dates, newData);

        }, delayInMilliseconds);
    };

    $scope.changeToConfirmed = function(){

        $scope.confirmed = true;
        $scope.new = false;

        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            init($chart, dates, confData);

        }, delayInMilliseconds);

    };

    $scope.changeToSl = function () {

        $scope.sl = true;
        $scope.global = false;

        $scope.stats = $scope.slStats;
        $scope.growthRate = $scope.slGrowthRate;
        $scope.cardLabel = "In Sri Lanka";

        newData = ln;
        confData = lc;
        $scope.changeToConfirmed();

    };

    $scope.changeToGlobal = function () {

        $scope.sl = false;
        $scope.global = true;

        $scope.stats = $scope.globalStats;
        $scope.growthRate = $scope.globalGrowthRate;

        $scope.cardLabel = "Globally";
        newData = gn;
        confData = gc;
        $scope.changeToConfirmed();


    };

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/stats/global'
    }).then(function successCallback(response) {

        $scope.globalStats=response.data;
        $scope.globalGrowthRate = (Math.round((($scope.globalStats.newCases)/($scope.globalStats.confirmedCases-$scope.globalStats.newCases))*100 * 100) / 100).toFixed(2);


    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/stats/sl'
    }).then(function successCallback(response) {

        $scope.slStats=response.data;
        $scope.stats = $scope.slStats;

        $scope.slGrowthRate = (Math.round((($scope.slStats.newCases)/($scope.slStats.confirmedCases-$scope.slStats.newCases))*100 * 100) / 100).toFixed(2);
        $scope.growthRate = $scope.slGrowthRate;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });


    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=dates'
    }).then(function successCallback(response) {

        dates=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });
    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=ln'
    }).then(function successCallback(response) {

        ln=response.data;
        newData = ln;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=gc'
    }).then(function successCallback(response) {

        gc=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=gn'
    }).then(function successCallback(response) {

        gn=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/graphs?type=lc'
    }).then(function successCallback(response) {

        lc=response.data;
        confData = lc;

        $scope.changeToConfirmed();




    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: 'http://localhost:8080/data/stats?country=usa'
    }).then(function successCallback(response) {

        $scope.countryData = response.data;




    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $scope.getCountryData = function(){

        console.log($scope.country);
        $http({
            method: 'GET',
            url: 'http://localhost:8080/data/stats?country='+$scope.country
        }).then(function successCallback(response) {

            $scope.countryData = response.data;




        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Retrieving Data");

        });
    };



    var $chart = $('#chart-sales3-dark');


    // Methods

    function init($chart, chartLabels, chartData) {

        var salesChart = new Chart($chart, {
            type: 'line',
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            lineWidth: 1,
                            color: Charts.colors.gray[900],
                            zeroLineColor: Charts.colors.gray[900]
                        },
                        ticks: {
                            callback: function(value) {
                                if (!(value % 10)) {
                                    return value;
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            var label = data.datasets[item.datasetIndex].label || '';
                            var yLabel = item.yLabel;
                            var content = '';

                            if (data.datasets.length > 1) {
                                content += label;
                            }

                            content +=yLabel;
                            return content;
                        }
                    }
                }
            },
            data: {
                labels: [],
                datasets: [{
                    label: 'Performance',
                    data: []
                }]
            }
        });

        // Save to jQuery object

        $chart.data('chart', salesChart);
        var data2 = { "labels": chartLabels, "datasets": [{ "label": "Performance", "data": chartData}] };

        salesChart["config"]["data"] = data2; //<--- THIS WORKS!
        salesChart.update();

    };


    // Events




});