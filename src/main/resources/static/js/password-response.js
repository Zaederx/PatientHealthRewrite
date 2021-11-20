"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PasswordResponse = /** @class */ (function (_super) {
    __extends(PasswordResponse, _super);
    function PasswordResponse(message, success, totalPages) {
        var _this = _super.call(this, message, success, totalPages) || this;
        _this.passwordsMatch = "";
        _this.passwordLength = "";
        _this.specialCharacters = "";
        _this.containsNumber = "";
        _this.containsUppercase = "";
        _this.containsLowercase = "";
        return _this;
    }
    return PasswordResponse;
}(JsonResponse));
