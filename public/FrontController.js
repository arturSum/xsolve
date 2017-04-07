
angular.module('sluzba').controller('FrontCtrl', function($scope, $http, $filter){


    $scope.oryginalModel = [];
    $scope.currentModel = [];
    $scope.columnsName = [];

    $scope.filterSettings = {
        colName : '',
        value : '',
        dateValue : (()=>{

            var currentDate = new Date();

            return new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                currentDate.getHours(),
                currentDate.getMinutes()
            );

        })()
    };

    $scope.selectedPage = 0;

    $scope.sortedSettings = {
        columnName : '',
        type : ''
    };


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

        $scope.sortedSettings = {
            columnName,
            type : sortingMethod
        } ;

    };



    //----------------------------------------



    $scope.$watchCollection('filterSettings', ()=>{

        $scope.selectedPage = 0;
        $scope.sortedSettings.columnName = '';

        $scope.currentModel = $filter('filterModel')($scope.oryginalModel, $scope.filterSettings);

    });

    $http.get('sluzba.json').then((response)=>{

        $scope.oryginalModel = response.data;
        $scope.currentModel = $scope.oryginalModel;

        $scope.columnsName = Object.keys($scope.oryginalModel[0]);

    });

});