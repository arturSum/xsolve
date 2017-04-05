
angular.module('sluzba').factory('dateConversion', ()=>{


    return{

        toNumber(timeString){

            var [dataChunk, timeChunk] = timeString.split(' '),
                [days, month, year] = dataChunk.split('.'),
                [hours, minutes] = timeChunk.split(':');


           return (new Date(

               year, month-1, days,
               hours, minutes

           )).getTime();

        }

    }

});