/* jshint globalstrict: true */
/* global Scope :false */
'use strict';


describe('Scope', function () {

    it('can be constructed and used as an object', function () {
        var scope = new Scope();
        scope.aProperty = 1;
        expect(scope.aProperty).toBe(1);

    });


    describe('digest', function () {
        var scope;


        beforeEach(function () {
            scope = new Scope();
        });


        it('calls the listener function of a watch on first $digest', function () {
            var watchFn = function () { return 'wat'; };
            /**
             * A spy is jasmine terminology for a kind of mock function. It makes it convenient for us 
             * to answer questions like "Was this function called?" and "What arguments was it called with??"
             */
            var listenerFn = jasmine.createSpy();
            scope.$watch(watchFn, listenerFn);
            scope.$digest();
            expect(listenerFn).toHaveBeenCalled();
        });

        /**
         * Checking for Dirty Value
         * To make accessing the scope from the watch function more comvenient, we want to call it 
         * with the current scope as an argument.
         */
        /**
         * ERROR
            it('calls the watch function with the scope as the argument', function () {
                var watchFn = jasmine.createSpy();
                var listenerFn = function(){};
                scope.$watch(watchFn,listenerFn);
                scope.$digest();
                expect(watchFn).toHaveBeenCalledWith(scope);
                    
            });
         */
        
        it('calls the listener function when the watched value changes', function () {
            scope.someValue = 'a';
            scope.counter = 0;
            scope.$watch(
                function (scope) { return scope.someValue; },
                function (newValue, oldValue, scope) { scope.counter++; }
            );
            expect(scope.counter).toBe(0);
            scope.$digest();
            expect(scope.counter).toBe(1);
            scope.$digest();
            expect(scope.counter).toBe(1);
            scope.someValue = 'b';
            expect(scope.counter).toBe(1);
            scope.$digest();
            expect(scope.counter).toBe(2);
        });
    });
});
