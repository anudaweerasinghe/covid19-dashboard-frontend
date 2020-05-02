var myApp = angular.module('myApp', []);

// var baseUrl = "https://anuda.me:8443/coronaback";
var baseUrl = "http://localhost:8080";

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
        $scope.activeCases = $scope.slActiveCases;
        $scope.growthRate = $scope.slGrowthRate;
        $scope.fatalityRate = $scope.sllFatalityRate;

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
        $scope.activeCases = $scope.globalActiveCases;
        $scope.growthRate = $scope.globalGrowthRate;
        $scope.fatalityRate = $scope.globalFatalityRate;
        newData = gn;
        confData = gc;
        $scope.changeToConfirmed();


    };

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats/global'
    }).then(function successCallback(response) {

        $scope.globalStats=response.data;
        $scope.globalActiveCases = $scope.globalStats.confirmedCases-$scope.globalStats.recoveries-$scope.globalStats.deaths;
        $scope.globalGrowthRate = (Math.round((($scope.globalStats.newCases)/($scope.globalStats.confirmedCases-$scope.globalStats.newCases))*100 * 100) / 100).toFixed(2);
        $scope.globalFatalityRate = (Math.round((($scope.globalStats.deaths)/($scope.globalStats.confirmedCases))*100 * 100) / 100).toFixed(2);

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats/sl'
    }).then(function successCallback(response) {

        $scope.slStats=response.data;
        $scope.stats = $scope.slStats;
        $scope.slActiveCases = $scope.slStats.confirmedCases-$scope.slStats.recoveries-$scope.slStats.deaths;
        $scope.activeCases = $scope.slActiveCases;
        $scope.slGrowthRate = (Math.round((($scope.slStats.newCases)/($scope.slStats.confirmedCases-$scope.slStats.newCases))*100 * 100) / 100).toFixed(2);
        $scope.sllFatalityRate = (Math.round((($scope.slStats.deaths)/($scope.slStats.confirmedCases))*100 * 100) / 100).toFixed(2);
        $scope.growthRate = $scope.slGrowthRate;
        $scope.fatalityRate = $scope.sllFatalityRate;
    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/news/global/min'
    }).then(function successCallback(response) {

        $scope.globalNews=response.data;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/news/local/min'
    }).then(function successCallback(response) {

        $scope.localNews=response.data;
        $scope.news = $scope.localNews;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=dates'
    }).then(function successCallback(response) {

        dates=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });
    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=ln'
    }).then(function successCallback(response) {

        ln=response.data;
        newData = ln;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=gc'
    }).then(function successCallback(response) {

        gc=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=gn'
    }).then(function successCallback(response) {

        gn=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=lc'
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
        url: baseUrl+'/news/global'
    }).then(function successCallback(response) {

        $scope.globalNews=response.data;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/news/local'
    }).then(function successCallback(response) {

        $scope.localNews=response.data;
        $scope.news = $scope.localNews;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

});

myApp.controller('data-controller', function ($scope, $http, $sce) {

    $scope.sl = true;
    $scope.global = false;
    $scope.cardLabel = "In Sri Lanka";

    $scope.confirmed = true;
    $scope.new = false;

    $scope.cardFiveA = "Total";
    $scope.cardFiveB = "Tests";

    $scope.iconFive = "fa-syringe";

    $scope.frameSource = $sce.trustAsResourceUrl("https://felipec.github.io/covid-19/trajectory.html");


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

        $scope.cardFiveA = "Total";
        $scope.cardFiveB = "Tests";
        $scope.dataFive = $scope.slStats.totalTests;
        $scope.iconFive = "fa-syringe";
        $scope.activeCases = $scope.slActiveCases;
        $scope.recoveryRate = $scope.slRecoveryRate;
        $scope.fatalityRate = $scope.slFatalityRate;
        newData = ln;
        confData = lc;
        $scope.changeToConfirmed();

    };

    $scope.changeToGlobal = function () {

        $scope.sl = false;
        $scope.global = true;

        $scope.stats = $scope.globalStats;
        $scope.growthRate = $scope.globalGrowthRate;

        $scope.cardFiveA = "New";
        $scope.cardFiveB = "Deaths";
        $scope.dataFive = $scope.globalStats.newDeaths;
        $scope.iconFive = "fa-times";
        $scope.activeCases = $scope.globalActiveCases;
        $scope.recoveryRate = $scope.globalRecoveryRate;
        $scope.fatalityRate = $scope.globalFatalityRate;

        $scope.cardLabel = "Globally";
        newData = gn;
        confData = gc;
        $scope.changeToConfirmed();


    };

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats/global'
    }).then(function successCallback(response) {

        $scope.globalStats=response.data;
        $scope.globalGrowthRate = (Math.round((($scope.globalStats.newCases)/($scope.globalStats.confirmedCases-$scope.globalStats.newCases))*100 * 100) / 100).toFixed(2);
        $scope.globalActiveCases = $scope.globalStats.confirmedCases-$scope.globalStats.recoveries-$scope.globalStats.deaths;
        $scope.globalRecoveryRate = (Math.round((($scope.globalStats.recoveries)/($scope.globalStats.confirmedCases))*100 * 100) / 100).toFixed(2);
        $scope.globalFatalityRate = (Math.round((($scope.globalStats.deaths)/($scope.globalStats.confirmedCases))*100 * 100) / 100).toFixed(2);

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats/sl'
    }).then(function successCallback(response) {

        $scope.slStats=response.data;
        $scope.stats = $scope.slStats;
        $scope.dataFive = $scope.slStats.totalTests;

        $scope.slGrowthRate = (Math.round((($scope.slStats.newCases)/($scope.slStats.confirmedCases-$scope.slStats.newCases))*100 * 100) / 100).toFixed(2);
        $scope.growthRate = $scope.slGrowthRate;
        $scope.slActiveCases = $scope.slStats.confirmedCases-$scope.slStats.recoveries-$scope.slStats.deaths;
        $scope.activeCases = $scope.slActiveCases;
        $scope.slRecoveryRate = (Math.round((($scope.slStats.recoveries)/($scope.slStats.confirmedCases))*100 * 100) / 100).toFixed(2);
        $scope.slFatalityRate = (Math.round((($scope.slStats.deaths)/($scope.slStats.confirmedCases))*100 * 100) / 100).toFixed(2);
        $scope.recoveryRate = $scope.slRecoveryRate;
        $scope.fatalityRate = $scope.slFatalityRate;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });


    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=dates'
    }).then(function successCallback(response) {

        dates=response.data;
    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });
    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=ln'
    }).then(function successCallback(response) {

        ln=response.data;
        newData = ln;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=gc'
    }).then(function successCallback(response) {

        gc=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=gn'
    }).then(function successCallback(response) {

        gn=response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/graphs?type=lc'
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
        url: baseUrl+'/data/stats?country=usa'
    }).then(function successCallback(response) {

        $scope.countryData = response.data;
        $scope.usa = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=italy'
    }).then(function successCallback(response) {

        $scope.italy = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=china'
    }).then(function successCallback(response) {

        $scope.china = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=spain'
    }).then(function successCallback(response) {

        $scope.spain = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=germany'
    }).then(function successCallback(response) {

        $scope.germany = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=france'
    }).then(function successCallback(response) {

        $scope.france = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=iran'
    }).then(function successCallback(response) {

        $scope.iran = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=uk'
    }).then(function successCallback(response) {

        $scope.uk = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=switzerland'
    }).then(function successCallback(response) {

        $scope.switzerland = response.data;



    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/data/stats?country=s.%20korea'
    }).then(function successCallback(response) {

        $scope.korea = response.data;

        var conf2Data = [$scope.usa.cases, $scope.italy.cases, $scope.china.cases, $scope.spain.cases, $scope.germany.cases, $scope.france.cases, $scope.iran.cases, $scope.uk.cases, $scope.switzerland.cases, $scope.korea.cases];

        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            initChart($chart2, conf2Data);

        }, delayInMilliseconds);


    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $scope.getCountryData = function(){

        console.log($scope.country);
        $http({
            method: 'GET',
            url: baseUrl+'/data/stats?country='+$scope.country
        }).then(function successCallback(response) {

            $scope.countryData = response.data;
            $scope.frameSource = $sce.trustAsResourceUrl("https://felipec.github.io/covid-19/trajectory.html?country="+$scope.countryData.country);


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

    var $chart2 = $('#chart-bars2');


    //
    // Methods
    //

    // Init chart
    function initChart($chart2, chart2Data) {

        // Create chart
        var ordersChart = new Chart($chart2, {
            type: 'bar',
            data: {
                labels: ['USA', 'Italy', 'China', 'Spain', 'Germany', 'France', 'Iran', 'UK', 'Switzerland', 'South Korea'],
                datasets: [{
                    label: 'Sales',
                    data: chart2Data
                }]
            }
        });

        // Save to jQuery object
        $chart2.data('chart', ordersChart);
    }


    // Events




});