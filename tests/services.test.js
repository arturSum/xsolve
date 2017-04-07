

describe('services', function(){

    var testedServices;

    beforeEach(angular.mock.module('sluzba'));


    beforeEach(angular.mock.inject(function(dateConversion){

       testedServices = dateConversion;

    }));


    describe('dateConversion', function(){


        it('should convert date string (pattern: 29.12.1977 18:25) to integer number', function(){

            var dateString = '1.12.2015 11:01',
                [date, time] = dateString.split(' '),
                [day, month, year] = date.split('.'),
                [hour, min] = time.split(':');


            expect(testedServices.toNumber(dateString)).toBe((new Date(year, month-1, day, hour, min)).getTime());

            expect(testedServices.toNumber('07.1.1080 00:01')).toBe((new Date('1080', '0', '07', '00', '01')).getTime());

        });


    });

});
