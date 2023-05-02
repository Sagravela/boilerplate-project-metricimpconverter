function ConvertHandler() {

  this.getNum = function(input) {
    let result;

    if (/^\d+(\.\d+)?(\/\d+)?(\.\d+)?\w+$/.test(input)) {
      let nums = input.match(/[\d.]+/g).map(num => num = parseFloat(num));

      if (nums.length > 1) {
        result = nums[0] / nums[1];
        result = parseFloat(result.toFixed(5));
      } else {
        result = nums[0];
      }
    } else if (/^\w+$/.test(input) || !input) {
      result = 1;
    }
    
    return result;
  };

  this.getUnit = function(input) {
    let result;
    let units = [ 'gal', 'L', 'mi', 'km', 'lbs', 'kg' ];
    let unit = input.match(/[A-Z]+/i);

    if (unit) {
      if (units.map(un => un.toLowerCase()).includes(unit[0].toLowerCase())) {
      result = unit[0].toLowerCase();
      }
    }
    
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'l';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
    } 

    return result;
  };

  this.spellOutUnit = function(unit) {
    const fullNameUnits = {
      'l': 'liters',
      'gal': 'gallons',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    }
    let result = fullNameUnits[unit];
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
    return result;
  };

}

module.exports = ConvertHandler;
