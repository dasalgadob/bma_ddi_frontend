require("babel-register");

import {isCurrentUserAdmin} from './../src/helpers/Auth';

var assert = require('chai').assert;
let window = {};
describe("Auth", function(){

    beforeEach(function() {
        let mockLocalStorage = {
            getItem: function (key) {
                if( key === 'id_token' ){ return /* a token object */; }
                return null;
            }
        }

        global.window = { localStorage: mockLocalStorage/* your mock localStorage */ };
      });

    describe("isCurrentUserAdmin()", function(){
        it("should return true if it query the API and the answer is true", function(){
            assert.equal(isCurrentUserAdmin(), true, "Current user should be an admin");
        });

        it("Should return false if the query to the API failed or connection is lost", function(){

        });
    });//End isCurrentUserAdmin

});