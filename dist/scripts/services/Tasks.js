(function(){
    function Tasks($firebaseArray){
        var firebaseRef = new Firebase("https://sweltering-inferno-7691.firebaseio.com/tasks"); 
        
        //Download tasks into a synchronized array
        var tasks = $firebaseArray(firebaseRef);
        
        return{
            //all: tasks
            add: function(task){
                var addTask = tasks.$add({
                    name: task,
                    date: Firebase.ServerValue.TIMESTAMP
                });
            },
            delete: function(task){
                return tasks.$remove(task);
            },
            all: function(){
                return tasks;
            }
        };
        
    };
    
    angular
        .module('blocTime')
        .factory('Tasks', ['$firebaseArray', Tasks]);
})();