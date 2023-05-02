'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    
    if (!initUnit && initNum) {
      res.send( 'invalid unit' );
    } else if (!initNum && initUnit) {
      res.send( 'invalid number' );
    } else if (!initNum && !initUnit) {
      res.send( 'invalid number and unit');
    } else {
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      const initUnitString = convertHandler.spellOutUnit(initUnit);
      const returnUnitString = convertHandler.spellOutUnit(returnUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const string = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString);    

      if (initUnit == 'l') {
        initUnit = initUnit.toUpperCase();
      }
      if (returnUnit == 'l') {
        returnUnit = returnUnit.toUpperCase();
      }
      
      res.json({
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": string
      });
    };
  });
};
