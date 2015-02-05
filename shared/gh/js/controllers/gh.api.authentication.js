/*!
 * Copyright 2014 Digital Services, University of Cambridge Licensed
 * under the Educational Community License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

define(['exports'], function(exports) {


    /////////////
    // GENERAL //
    /////////////

    /**
     * Log out the current user
     *
     * @param  {Function}    callback             Standard callback function
     * @param  {Object}      callback.err         Error object containing the error code and error message
     */
    var logout = exports.logout = function(callback) {
        if (!_.isFunction(callback)) {
            throw new Error('A callback function should be provided');
        }

        $.ajax({
            'url': '/api/auth/logout',
            'type': 'POST',
            'success': function() {
                return callback();
            },
            'error': function(jqXHR, textStatus) {
                return callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };


    //////////////////////////
    // LOCAL AUTHENTICATION //
    //////////////////////////

    /**
     * Log in using local authentication
     *
     * @param  {String}      username             The username to log in with
     * @param  {String}      password             The password to log in with
     * @param  {Function}    callback             Standard callback function
     * @param  {Object}      callback.err         Error object containing the error code and error message
     */
    var login = exports.login = function(username, password, callback) {
        if (!_.isFunction(callback)) {
            throw new Error('A callback function should be provided');
        } else if (!_.isString(username)) {
            return callback({'code': 400, 'msg': 'A valid value for username should be provided'});
        } else if (!_.isString(password)) {
            return callback({'code': 400, 'msg': 'A valid value for password should be provided'});
        }

        var data = {
            'username': username,
            'password': password
        };

        $.ajax({
            'url': '/api/auth/login',
            'type': 'POST',
            'data': data,
            'success': function() {
                return callback();
            },
            'error': function(jqXHR, textStatus) {
                return callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };


    //////////////////////////
    // SIGNED AUTHENTICATON //
    //////////////////////////

    /**
     * Log in using Shibboleth authentication
     */
    /* istanbul ignore next */
    var shibbolethLogin = exports.shibbolethLogin = function() {
        $.ajax({
            'url': '/api/auth/shibboleth',
            'type': 'POST'
        });
    };

    /**
     * Get the request information for an administrator to become a user
     *
     * @param  {Number}      userId          The ID of the user to become
     * @param  {Function}    callback        Standard callback function
     * @param  {Object}      callback.err    Error object containing the error code and error message
     */
    var becomeUser = exports.becomeUser = function(userId, callback) {
        if (!_.isFunction(callback)) {
            throw new Error('A callback function should be provided');
        } else if (!_.isNumber(userId)) {
            return callback({'code': 400, 'msg': 'A valid user id should be provided'});
        }

        return callback();
    };
});
