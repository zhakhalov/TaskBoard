﻿(function (define, require) {
  define(
  ['ko', 'vm/modal/task', 'vm/modal/ok-cancel', 'svc/project'],
  function (ko, taskModal, okCancel, projectService) {
    return function (project, column, tasks) {
      var self = this;
      self.project = project;
      self.column = column;
      self.title = ko.observable(column.Title);
      self.cssClass = ko.observable(column.CssClass);
      self.allowCreate = ko.observable(column.AllowCreate);
      self.tasks = ko.observableArray(
        tasks
        .filter(function (entry) {
          return self.column.Status === entry.Status;
        })
        .map(function (entry) {
          var taskVM = ko.mapping.fromJS(entry);
          taskVM.pending = ko.observable(false)
          return taskVM;
        }));
      self.tasks.project = project;
      self.tasks.column = column;
      self.create = function () {
        taskModal.show('Create new task', {
          Title: '',
          Description: '',
          StartDate: '',
          DueDate: '',
          Status: self.column.Status
        }, function (task, done) {
          projectService.createTask(self.project._id, task, function (err, res) {
            if (err) {
              console.error(err);
            } else {
              var taskVM = ko.mapping.fromJS(res);
              taskVM.pending = ko.observable(false);
              self.tasks.push(taskVM);
              done();
            }
          });
        });
      };
      self.edit = function (task) {
        taskModal.show('Edit task', ko.mapping.toJS(task), function (update, done) {
          projectService.updateTask(self.project._id, update, function (err, res) {
            if (err) {
              console.error(err);
            } else {
              var taskVM = ko.mapping.fromJS(res);
              taskVM.pending = ko.observable(false)
              self.tasks.replace(
               ko.utils.arrayFirst(self.tasks(), function (entry) { return entry._id() == res._id; }),
               taskVM);
              done();
            }
          })
        })
      };
      self.delete = function (task) {
        okCancel.show('Delete task: ' + task.Title(), function (done) {
          projectService.deleteTask(self.project._id, task._id(), function (err) {
            if (err) {
              console.error(err);
            } else {
              self.tasks.remove(task);
              done();
            }
          })
        });        
      };
    }
  });
})(window.define, window.require);