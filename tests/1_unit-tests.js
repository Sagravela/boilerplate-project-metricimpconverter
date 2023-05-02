const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
let units = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg' ];
const fullNameUnits = {
  'l': 'liters',
  'gal': 'gallons',
  'mi': 'miles',
  'km': 'kilometers',
  'lbs': 'pounds',
  'kg': 'kilograms'
}

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input.', function () {
    assert.equal(convertHandler.getNum('12gal'), 12);
  });
  test('convertHandler should correctly read a decimal number input.', function () {
    assert.equal(convertHandler.getNum('12.5gal'), 12.5);
  });
  test('convertHandler should correctly read a fractional input.', function () {
    assert.equal(convertHandler.getNum('12/5gal'), 2.4);
  });
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.equal(convertHandler.getNum('12.5/5.7gal'), 2.19298);
  });
  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.isNotOk(convertHandler.getNum('3/2/3'), undefined);
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum('gal'), 1);
  });
  test('convertHandler should correctly read each valid input unit.', function () {
    for (let i = 0; i < units.length; i++) {
      assert.equal(convertHandler.getUnit(units[i]), units[i]);
    };  
  });
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.isNotOk(convertHandler.getUnit('asd'), undefined);
  });
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal(convertHandler.getReturnUnit('l'), 'gal');
    assert.equal(convertHandler.getReturnUnit('gal'), 'l');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');    
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    for (let prop in fullNameUnits) {
      assert.equal(convertHandler.spellOutUnit(prop), fullNameUnits[prop]);
    }
  });
  test('convertHandler should correctly convert gal to L.', function () {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });
  test('convertHandler should correctly convert L to gal.', function () {
    assert.equal(convertHandler.convert(1, 'l'), 0.26417);
  });
  test('convertHandler should correctly convert mi to km.', function () {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });
  test('convertHandler should correctly convert km to mi.', function () {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
  });
  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });
  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
  });
});
