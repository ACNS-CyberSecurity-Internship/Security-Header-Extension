
// To Run Test Suite: npm test

// Import Assert and File to Test

let assert = require('assert');
let index = require('../src/index.js');

// Function Being Tested

describe('dataCollection', function()
{
    // Tests

    it('should have a first test function', function()
    {
        assert(1 === 1);
    });

    it('should have a second test function', function()
    {
        assert(2 === 2);
    });

    it('should have a third test function', function()
    {
        assert(3 === 3);
    });
});

describe('date', function()
{
    it('should have a first test function', function()
    {
        assert(1 === 1);
    });
});