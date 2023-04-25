
let fs = require('fs'),
    //grab my helper functions
    helper = require('./helper');


var exampleFile = [
    {
      person: 'albert',
      'meat-type': 'pepperoni',
      date: "2015-01-01T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'sausage',
      date: "2015-01-02T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'pineapple',
      date: "2015-01-03T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'pepperoni',
      date: "2015-01-06T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'pepperoni',
      date: "2015-01-06T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'sausage',
      date: "2015-01-07T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'sausage',
      date: "2015-01-07T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'pineapple',
      date: "2015-01-07T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'albert',
      'meat-type': 'pineapple',
      date: "2015-01-08T00:00:00.000Z",
      __v: 0
    },
  ]

var exampleFile2 = [
    {
      person: 'sebastian',
      'meat-type': 'sausage',
      date: "2015-05-01T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'sebastian',
      'meat-type': 'pineapple',
      date: "2015-05-01T00:00:00.000Z",
      __v: 0
    },
    {
      person: 'sebastian',
      'meat-type': 'pepperoni',
      date: "2015-05-01T00:00:00.000Z",
      __v: 0
    },
    {
        person: 'sebastian',
        'meat-type': 'pepperoni',
        date: "2015-05-02T00:00:00.000Z",
        __v: 0
      }
  ]
  


describe("Helper tests for the two logic heavy routes", () => {
    test('testing finding a streak on a given csv', () => {
        result = helper.findStreak(JSON.stringify(exampleFile));
        expect(result.length).toBe(3);
    });
    test('testing finding a day with the most consumption out of a given example file', () => {
        result = helper.findMostPizza(JSON.stringify(exampleFile2));
        expect(result).toBe("Fri, 01 May 2015 00:00:00 GMT");
    });
})