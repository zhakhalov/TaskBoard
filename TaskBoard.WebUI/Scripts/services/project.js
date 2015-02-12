﻿(function (define, require) {
    define(['jquery', 'services/user'], function ($, userService) {
        var service = function () {
            var self = this;
            self.projects = [];
            self.project = {};
            self.getProjects = function (callback) {
                $.ajax({
                    url: 'api/projects',
                    type: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        self.projects = res;
                        callback(null, res);
                    },
                    error: function (res) {
                        callback(res);
                    }
                });
            };
            self.createTask = function (task, callback) {
                $.ajax({
                    url: 'api/projects/' + self.project._id + '/task',
                    type: 'POST',
                    dataType: 'json',
                    data: task,
                    success: function (res) {
                        self.projects = res;
                        callback(null, res);
                    },
                    error: function (res) {
                        callback(res);
                    }
                });
            };
            self.updateTask = function (task, callback) {
                $.ajax({
                    url: 'api/projects/' + self.project._id + '/task',
                    type: 'PUT',
                    dataType: 'json',
                    data: task,
                    success: function (res) {
                        self.projects = res;
                        callback(null, res);
                    },
                    error: function (res) {
                        callback(res);
                    }
                });
            };
            self.deleteTask = function (task, callback) {
                $.ajax({
                    url: 'api/projects/' + self.project._id + '/task/' + task._id,
                    type: 'POST',
                    dataType: 'json',
                    success: function (res) {
                        self.projects = res;
                        callback(null, res);
                    },
                    error: function (res) {
                        callback(res);
                    }
                });
            };
            self.selectProject = function (project) {
                self.project = project;
            };
        }
        return new service();
    });
})(window.define, window.require);