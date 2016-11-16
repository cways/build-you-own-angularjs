# chapter one Scopes And Digest
## 1 Scope
### 1.1 `$$watchers`
the Scope needs to have some place to store all the watchers that have been registered.

```javascript
function Scope(){
    this.$$watchers = [];
}
```
## 2 $watch
with `$watch` you can attach a watcher to a scope. A watcher is something that is notified when a change occurs in the scope. You create a watcher by providing two functions to `$watch`:

+ A watch function, which specifies the piece of data you're interested in.
+ A listener function, which will be called whenever that data changes.

```javascript 
Scope.prototype.$watch = function(watchFn, listenerFn){
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn
    };
    this.$$watchers.push(watcher);
}
```

## 3 $digest
the other side of the coin is the `$digest` function. It iterates(重复) over all the watchers that have been attached on the scope , and runs their watch and listener functions accordingly.  
The $digest function's job is really to call the watch function and compare its return value to whatever the same function returned last time . If the values differ , the watcher is dirty and its listener function should be called.

```javascript
Scope.prototype.$digest = function(){
    _.forEach(this.$$watchers, function(watcher) {
        watcher.listenerFn();
    });
}
```

## 4 watcher and listener
### 4.1 listener
> Notice that we also specify the contract of the listener function: Just like the watch function, it takes the scope as an argument. It's also given the new and old values of the watcher. This makes it easier  for application developers to check what exactly has changed.

To make this work, `$digest` has to remember what the last value of each watch function was. Since we already has an object for each watcher, we can conveniently store the last value there. Here's a new definition of `$digest` that checks for value changes for each watch function:

```javascript
Scope.prototype.$digest = function(){
    var self = this;
    var newValue, oldValue;
    _.forEach(this.$$watchers, function(watcher){
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if(newValue!==oldValue){
            watcher.last = newValue;
            watcher.listenerFn(newValue, oldValue, self);
        }
    }
}
```




