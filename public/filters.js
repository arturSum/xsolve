
angular.module('sluzba')

    .filter('filterModel', (dateConversion)=>{

        return (model = [], filterSettings)=>{

            var filteredModel = model,
                stringSource;

            if(filterSettings.colName !== ''){

                if(
                    typeof filterSettings.value === 'string' &&
                    filterSettings.value !== ''
                ){

                    filteredModel = [];

                    model.forEach((data)=>{

                        //for numbers
                        if(filterSettings.colName === 'id' || filterSettings.colName === 'experience') {

                            stringSource = data[filterSettings.colName].toString();
                        }
                        else{

                            stringSource = data[filterSettings.colName].toLowerCase();
                        }


                        if(stringSource.slice(0, filterSettings.value.length) == filterSettings.value.toLowerCase()){

                            filteredModel.push(data);
                        }

                    });

                }
                else{

                    try{

                        if(filterSettings.colName === 'dateOfBirth'){

                            var timeSearching = filterSettings.dateValue.getTime(),
                                timeFromCurrentModelData = 0;

                            filteredModel = [];

                            model.forEach((data)=>{

                                timeFromCurrentModelData = dateConversion.toNumber(
                                    data[filterSettings.colName]
                                );

                                timeSearching == timeFromCurrentModelData? filteredModel.push(data) : null;

                            });

                        }

                    }
                    catch(error){

                        filteredModel = [];
                    }

                }

            }

            return filteredModel;
        }
    }).

    filter('limitModel', (paginationSize)=>{

        return (model, pageNmbr)=>{

            var startIndex = (pageNmbr-1)*paginationSize,
                endIndex = startIndex + paginationSize;


            if(pageNmbr === 0){

                return model;
            }

            return model.slice(startIndex, endIndex);
        }

    }).

    filter('sortData', (dateConversion)=>{


        var sortNumbers = (model, filteredPropName, direction)=>{

                switch(direction){

                    case 'asc':
                        model.sort((current, next)=>{

                            return current[filteredPropName] - next[filteredPropName];
                        });

                        break;

                    case 'desc':
                        model.sort((current, next)=>{

                            return next[filteredPropName] - current[filteredPropName];
                        });

                        break;
                }

                return model;
            },


            prepareModelForSorting = function prepareModelForSorting(model, propName){

                var dateKeyStorage = [],
                    dateValueStorage = [],
                    temp = [],
                    singleIntDate = 0;


                model.forEach((data)=>{

                    singleIntDate = dateConversion.toNumber(
                        data[propName]
                    );

                    dateKeyStorage.push(singleIntDate);
                    dateValueStorage.push(data);

                    temp.push({
                        dataForSorting : singleIntDate
                    });

                });

                return [
                    dateKeyStorage,
                    dateValueStorage,
                    temp
                ]

            },

            sortStrings = (model, filteredPropName, direction)=>{

                if(filteredPropName == 'dateOfBirth'){

                    var sortedTemporaryDateStorage = [],
                        sortedModel = [],

                    [

                        unsortedIntDateKeyStorage,
                        unsortedIntDateValueStorage,
                        unsortedTemporaryDateStorage

                    ] = prepareModelForSorting(model, filteredPropName);

                    //---------------------------

                    sortedTemporaryDateStorage = sortNumbers(unsortedTemporaryDateStorage, 'dataForSorting', 'asc');

                    sortedTemporaryDateStorage.forEach((data)=>{

                           var searchingValue = data.dataForSorting,
                               searchingValuePosition = unsortedIntDateKeyStorage.indexOf(searchingValue);

                           if(searchingValue != -1){

                               sortedModel.push(unsortedIntDateValueStorage[searchingValuePosition])
                           }

                    });

                    model = sortedModel;
                }
                else{

                    model.sort((current, next)=>{

                        return current[filteredPropName].toLowerCase().localeCompare(next[filteredPropName].toLowerCase());
                    });

                }

                if(direction === 'desc') {

                    model.reverse();
                }

                return model;
            };


            //----------------------------------------


            return (data, propName, direction)=>{

                switch(typeof data[0][propName]){

                    case 'number':
                        return sortNumbers(data, propName, direction);

                    case 'string':
                    default:
                        return sortStrings(data, propName, direction);

                }



            }


    }).

    filter('pageSizeCounter', (paginationSize)=>{

        return(model)=>{

            var pagQnt = Math.ceil(model.length/paginationSize);

            if(pagQnt === 1){
                return [];
            }

            return Array.from({length:pagQnt}, (val, key) => key+1);
        }

    });