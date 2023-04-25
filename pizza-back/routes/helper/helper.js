let mongoose = require("mongoose"),
    express = require("express"),
    fs = require('fs');

function findStreak(list){
    // given an array of days + eaten food
    // keep going until the amount of pizzas on a day is less
    // easiest way: first make all dates (days), then sort the days
    // then put them into a map, and simply call each day and once its lower stop
    // return the resulting array of days
    
    var temp = JSON.parse(list);
    for(i = 0; i<temp.length; i++){
        var days = Math.floor(new Date(temp[i]["date"]).getTime() / (1000*60*60*24));
        temp[i]["days"] = days;

    }
    temp = temp.sort((a, b) => {
        return a["days"] - b["days"];
    })

    var largestStreak=0;
    var streak = 0;
    var pastpizzas = 0;
    var pizzas = 0;
    var currDay = temp[0]["date"];
    var dayList = [];
    var finalArray = [];
    for (i = 0; i<temp.length; i++){
        //hammy way of doing the edge case of the last pizza adding to the streak
        if(i == temp.length -1){
            pizzas++;
        }
        if(temp[i]["date"] == currDay && i != temp.length-1){
            pizzas++;
        }
        else{
            if(pizzas>pastpizzas){
                streak++;
                //last day was part of the streak
                dayList.push({pizzaStreak: streak, day: currDay});
                if(streak>largestStreak){
                    //if streak is larger, update the largest date array
                    finalArray = dayList;
                }
                largestStreak = Math.max(largestStreak, streak);
            }
            else{
                streak = 1;
                //empty day array;
                dayList = [];
                //start finding a new one
                dayList.push({pizzaStreak: streak, day: currDay});
            }
            pastpizzas = pizzas;
            pizzas=1;
            currDay=temp[i]["date"];
        }
    }
    return finalArray;
}

function findMostPizza(list){
    // given a list of pizza consumed dates
    // store all into a map, and just go through all of it, storing the largest day/consumed
    // return at end
    var temp = JSON.parse(list);
    const dayMap = new Map();
    var largestDay = 0;
    var largestConsumption = 0;
    for(i = 0; i<temp.length; i++){
        //converting to UTC to offset issues
        var day = new Date(temp[i]["date"]).toUTCString();
        if(dayMap.has(day)){
            var curr = dayMap.get(day) + 1;
            if(curr>largestConsumption){
                largestDay = day;
                largestConsumption = curr;
            }
        }
        else{
            dayMap.set(day, 1);
            if(1>largestConsumption){
                largestDay = day;
                largestConsumption = 1;
            }
        }
        
    }
    return largestDay;
}

module.exports = {findMostPizza, findStreak};