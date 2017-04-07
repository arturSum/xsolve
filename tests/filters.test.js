

describe('filters', function(){

    var filterInstance,
        filterSettings,
        modelData;


    beforeEach(function(){

        angular.mock.module('sluzba');
        angular.mock.module('mockedModelData');


        filterSettings = {

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

    });



    describe('filterModel', function() {

        var filteredModel = [];


        beforeEach(angular.mock.inject(function ($filter, mockedModel) {

            filterInstance = $filter;
            modelData = mockedModel;

        }));


        describe('colName:id', function () {


            it('should return corrected filtered model array', function () {

                filterSettings.colName = 'id';
                filterSettings.value = '1';

                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(4);


                filterSettings.value = '11';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(1);


                filterSettings.value = '111';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = '21';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);

                filterSettings.value = 'x';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);

                filterSettings.value = 'x';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = '';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(modelData.length);


                filterSettings.value = '12.8134';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = null;
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(12);


                filterSettings.value = undefined;
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(12);


            });


        });


        describe('colName:firstName', function () {


            it('should return corrected filtered model array', function () {

                filterSettings.colName = 'firstName';
                filterSettings.value = 'xxx';

                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = '1';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = '';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(12);


                filterSettings.value = 'Nowak';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = 'Walerian';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(2);


                filterSettings.value = 'w';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(3);


                filterSettings.value = 'W';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(3);


                filterSettings.value = '1';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = 'undefined';
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.value = null;
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(12);


                filterSettings.value = {};
                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(12);


            });


        });


        //######################
        xdescribe('colName:dateOfBirth', function () {


            it('should return corrected filtered model array', function () {

                //"dateOfBirth":"1.7.1990 11:35",

                filterSettings.colName = 'dateOfBirth';
                filterSettings.dateValue = new Date('1990', '07', '01', '11', '34');

                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(0);


                filterSettings.dateValue = new Date('1990', '7', '1', '11', '35');

                console.log(filterSettings.dateValue.getTime());


                filteredModel = filterInstance('filterModel')(modelData, filterSettings);
                expect(filteredModel.length).toBe(11);


            });


        });


    });


    describe('limitModel', function() {

        var limitModel = [],
            pageSize = 0;


        beforeEach(angular.mock.inject(function ($filter, mockedModel, paginationSize) {

            filterInstance = $filter;
            modelData = mockedModel;
            pageSize = paginationSize

        }));


        it('should return correct chunk of input model array', function(){

                limitModel = filterInstance('limitModel')(modelData, 1);

                expect(limitModel.length).toBe(pageSize);

                expect(limitModel[0]).toEqual({
                    "id":1,
                    "firstName":"Dobromir",
                    "lastName":"Sprytny",
                    "dateOfBirth":"1.7.1990 11:35",
                    "function":"kamerdyner",
                    "experience":4
                });

                expect(limitModel[4]).toEqual({
                    "id":5,
                    "firstName":"Krzysztof",
                    "lastName":"Klucznik",
                    "dateOfBirth":"10.10.1986 18:00",
                    "function":"lokaj",
                    "experience":3
                });

                //----------------------

                limitModel = filterInstance('limitModel')(modelData, 2);
                expect(limitModel.length).toBe(pageSize);

                expect(limitModel[0]).not.toEqual({
                    "id":5,
                    "firstName":"Krzysztof",
                    "lastName":"Klucznik",
                    "dateOfBirth":"10.10.1986 18:00",
                    "function":"lokaj",
                    "experience":3
                });

                expect(limitModel[4]).toEqual({
                    "id":10,
                    "firstName":"Walerian",
                    "lastName":"Drażliwy",
                    "dateOfBirth":"29.03.1980 15:36",
                    "function":"lokaj",
                    "experience":8
                });

                //----------------------

                limitModel = filterInstance('limitModel')(modelData, 3);
                expect(limitModel.length).toBe(Math.floor(modelData.length/pageSize));

                expect(limitModel[1]).toEqual({
                    "id":12,
                    "firstName":"Urszula",
                    "lastName":"Markotna",
                    "dateOfBirth":"06.04.1981 12:35",
                    "function":"pokojówka",
                    "experience":8
                });


        });


    });


    describe('pageSizeCounter', function(){


        var pageSize = 0,
            arrayFromFilter = [];

        beforeEach(angular.mock.inject(function ($filter, mockedModel, paginationSize) {

            filterInstance = $filter;
            modelData = mockedModel;
            pageSize = paginationSize;

        }));


        it('should return array of numbers that wil be use for pagination button', function(){

            arrayFromFilter = filterInstance('pageSizeCounter')(modelData);
            expect(arrayFromFilter).toEqual([1, 2, 3]);


            arrayFromFilter = filterInstance('pageSizeCounter')(modelData.slice(0, 8));
            expect(arrayFromFilter).toEqual([1, 2]);


            arrayFromFilter = filterInstance('pageSizeCounter')(modelData.slice(0, 11));
            expect(arrayFromFilter).toEqual([1, 2, 3]);


            arrayFromFilter = filterInstance('pageSizeCounter')(modelData.slice(0, 2));
            expect(arrayFromFilter).toEqual([]);


            arrayFromFilter = filterInstance('pageSizeCounter')(modelData.slice(0, 6));
            expect(arrayFromFilter).toEqual([1, 2]);

        });


    });


    describe('sortData', function(){

        var sortedModel = [];


        beforeEach(angular.mock.inject(function ($filter, mockedModel) {

            filterInstance = $filter;
            modelData = mockedModel;

        }));


        describe('sort by numbers', function(){


            it('should sort with required direction', function(){

                sortedModel = filterInstance('sortData')(modelData, 'id', 'asc');

                var idPropFromSortedModel = sortedModel.map((data)=>{
                    return data.id;
                });

                expect(idPropFromSortedModel).toEqual([ ...Array.from({length:12}, (val, key) => key+1) ]);


                sortedModel = filterInstance('sortData')(modelData, 'id', 'desc');

                idPropFromSortedModel = sortedModel.map((data)=>{
                    return data.id;
                });

                expect(idPropFromSortedModel).toEqual([ ...Array.from({length:12}, (val, key) => key+1).reverse() ]);

                //----------- experience --------------

                sortedModel = filterInstance('sortData')(modelData, 'experience', 'asc');

                idPropFromSortedModel = sortedModel.map((data)=>{
                    return data.id;
                });

                expect(idPropFromSortedModel[0]).toBe(5);
                expect(idPropFromSortedModel[9]).toBe(3);

            });

        });


        describe('sort strings', function(){


            it('should sort with required direction', function(){

                sortedModel = filterInstance('sortData')(modelData, 'firstName', 'asc');

                var propFromSortedModel = sortedModel.map((data)=>{
                    return data.firstName;
                });

                expect(propFromSortedModel).toEqual([
                    'Dobromir', 'Helga', 'Katarzyna', 'Konstancja', 'Kornelia',
                    'Krzysztof', 'Marianna', 'Mirosław', 'Urszula', 'Walerian',
                    'Walerian', 'Władysława'
                ]);

                //----------------------------

                sortedModel = filterInstance('sortData')(modelData, 'dateOfBirth', 'desc');

                propFromSortedModel = sortedModel.map((data)=>{
                    return data.dateOfBirth;
                });

                expect(propFromSortedModel).toEqual([

                    '1.7.1990 11:35', '10.10.1986 18:00', '03.01.1986 23:10', '05.05.1983 01:15',
                    '06.04.1981 12:35', '29.03.1980 15:36', '29.12.1977 18:25', '28.10.1976 2:15',
                    '4.02.1976 14:37', '19.02.1973 23:55', '09.12.1972 17:35', '29.02.1936 13:33'

                ]);


            });


        });


    });



});