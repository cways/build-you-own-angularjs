'use strict';
function Scope() {
    this.$$watchers = [];
}
/**
 * Now we can define the $watch function.
 * It'll take the two functions as arguments,and store them in the $$watchers array.
 * We want every Scope object to have this function, so let us add it to the prototype of Scope.
 */
Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn
    };
    this.$$watchers.push(watcher);
};
/**
 * For now , let us define a very simple version of it , which just iterates over all registered
 * watchers and calls their listener function.
 */
Scope.prototype.$digest = function () {
    var self = this;
    var newValue, oldValue;
    _.forEach(this.$$watchers, function (watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (newValue !== oldValue) {
            /**
            * Notice that we also specify the contract of the listener function: Just like the watch function,
            * it takes the scope as an arguments. It is also given the new and old values of the watcher.
            * This makes it easier for application developers to check what exactly has changed.
            */
            watcher.last = newValue;
            watcher.listenerFn(newValue,oldValue,self);
        }
    });
};
