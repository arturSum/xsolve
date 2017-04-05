
angular.module('sluzba').controller('FrontCtrl', function($scope, $http, $filter){


    $scope.oryginalModel = [];
    $scope.currentModel = [];
    $scope.columnsName = [];

    $scope.filterSettings = {
        colName : '',
        value : '',
        dateValue : new Date()
    };

    $scope.selectedPage = 0;


    //-----------------------------------------



    $scope.selectPage = (pageNmbr)=>{

        $scope.selectedPage = pageNmbr;
    };


    $scope.sortDataByColumn = (columnName, event)=>{

        var element = event.target,
            sortingMethod = element.getAttribute('data-sorting-method');

        $scope.selectedPage = 0;

        $scope.currentModel = $filter('sortData')($scope.currentModel, columnName, sortingMethod);

        element.setAttribute('data-sorting-method', sortingMethod === 'asc'? 'desc' : 'asc');

    };



    //----------------------------------------



    $scope.$watchCollection('filterSettings', ()=>{

        $scope.selectedPage = 0;

        $scope.currentModel = $filter('filterModel')($scope.oryginalModel, $scope.filterSettings);

    });

    $http.get('sluzba.json').then((response)=>{

        $scope.oryginalModel = response.data;
        $scope.currentModel = $scope.oryginalModel;

        $scope.columnsName = Object.keys($scope.oryginalModel[0]);

    });

});