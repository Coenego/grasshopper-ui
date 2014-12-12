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

    /**
     * Get the members of a group
     *
     * @param  {Number}      id                   The id of the group to get the members for
     * @param  {Number}      [limit]              The maximum number of results to retrieve. Default: 10
     * @param  {Number}      [offset]             The paging number of the results to retrieve
     * @param  {Function}    callback             Standard callback function
     * @param  {Object}      callback.err         Error object containing the error code and error message
     * @param  {Object}      callback.response    The members of the group
     */
    var getGroupMembers = exports.getGroupMembers = function(id, limit, offset, callback) {
        if (!_.isFunction(callback)) {
            throw new Error('A callback function should be provided');
        } else if (!_.isNumber(id)) {
            return callback({'code': 400, 'msg': 'A valid group ID should be provided'});
        } else if (limit && !_.isNumber(limit)) {
            return callback({'code': 400, 'msg': 'A valid value for limit should be provided'});
        } else if (offset && !_.isNumber(offset)) {
            return callback({'code': 400, 'msg': 'A valid value for offset should be provided'});
        }

        $.ajax({
            'url': '/api/groups/' + id + '/members',
            'type': 'GET',
            'data': {
                'limit': limit,
                'offset': offset
            },
            'success': function(data) {
                return callback(null, data);
            },
            'error': function(jqXHR, textStatus) {
                return callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };

    /**
     * Update the members of a group
     *
     * @param  {Number}                id              The id of the group for which to update the members
     * @param  {GroupMembersUpdate}    body            Object that describes the group member changes to apply
     * @param  {Function}              callback        Standard callback function
     * @param  {Object}                callback.err    Error object containing the error code and error message
     */
    var updateGroupMembers = exports.updateGroupMembers = function(id, body, callback) {
        if (!_.isFunction(callback)) {
            throw new Error('A callback function should be provided');
        } else if (!_.isNumber(id)) {
            return callback({'code': 400, 'msg': 'A valid group ID should be provided'});
        } else if (!_.isObject || $.isEmptyObject(body)) {
            return callback({'code': 400, 'msg': 'A valid value for body should be provided'});
        }

        $.ajax({
            'url': '/api/groups/' + id + '/members',
            'type': 'POST',
            'data': body,
            'success': function(data) {
                return callback(null, data);
            },
            'error': function(jqXHR, textStatus) {
                return callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };

    /**
     * Lock a group
     *
     * @param  {Number}    id    The id of the group to lock
     */
    var lock = exports.lock = function(id) {
        if (!_.isNumber(id)) {
            throw new Error('A valid group ID should be provided');
        }

        return;

        /**
         * TODO: wait for the back-end implementation
         *
        $.ajax({
            'url': '/api/groups/' + id + '/lock',
            'type': 'POST',
            'error': function(jqXHR, textStatus) {
                thrown new Error(jqXHR.responseText);
            }
        });
         */
    };

    /**
     * Release the lock on a group
     *
     * @param  {Number}    id    The id of the group to release the lock from
     */
    var unlock = exports.unlock = function(id) {
        if (!_.isNumber(id)) {
            throw new Error('A valid group ID should be provided');
        }

        return;

        /*
         * TODO: wait for the back-end implementation
         *
        $.ajax({
            'url': '/api/groups/' + id + '/lock',
            'type': 'DELETE',
            'error': function(jqXHR, textStatus) {
                thrown new Error(jqXHR.responseText);
            }
        });
         */
    };
});
