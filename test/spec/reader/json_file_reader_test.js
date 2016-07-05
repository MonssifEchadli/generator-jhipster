'use strict';

const expect = require('chai').expect,
    fail = expect.fail,
    readEntityJSON = require('../../../lib/reader/json_file_reader').readEntityJSON;

describe('::readEntityJSON', function () {
  describe('when passing an invalid argument', function () {
    describe('because it is nil', function () {
      it('fails', function () {
        try {
          readEntityJSON();
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    describe('because it is empty', function () {
      it('fails', function () {
        try {
          readEntityJSON('');
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    describe('because the file does not exist', function () {
      it('fails', function () {
        try {
          readEntityJSON('test/test_files/WrongFile.json');
          fail();
        } catch (error) {
          expect(error.name).to.eq('FileNotFoundException');
        }
      });
    });
    describe('because the file is a folder', function () {
      it('fails', function () {
        try {
          readEntityJSON('test/test_files/');
          fail();
        } catch (error) {
          expect(error.name).to.eq('FileNotFoundException');
        }
      });
    });
  });
  describe('when passing a valid entity name', function () {
    it('reads the file', function () {
      var content = readEntityJSON('test/test_files/MyEntity.json');
      expect(content).to.deep.eq({
            "relationships": [],
            "fields": [
              {
                "fieldName": "myField",
                "fieldType": "String"
              }
            ],
            "changelogDate": "20160705183933",
            "dto": "no",
            "service": "no",
            "entityTableName": "my_entity",
            "pagination": "no"
          }
      )
    });
  });
});
