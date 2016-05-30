(function(){
    function HomeCtrl($interval, Tasks){
        //Initialize variables
        
        //Constants
        var WORK_TIME = 10; ///seconds
        var BREAK_TIME = 5;
        var LONG_BREAK_TIME = 7;
        var mySound = new buzz.sound("assets/sounds/ding.mp3",
                      {
                          preload: true
                      });
        
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////PRIVATE/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
        
        /**************Private variables******************/
        
        //Count down timer used in $interval
        var timer; 
        //Number of completed work sessions
        var completedSessions = 0;
        //Allows inner function to gain access to 'this'
        var self = this;
        
        /**************Private functions *****************/
        
        /**
        * @function countdown
        * @desc Counts down the timer
        */
        var countdown = function(){
            self.time -= 1;
            self.buttonName = "Reset";
            
            //If the timer has run out
            if(self.time <= 0){
                mySound.play();
                if(!self.onBreak){
                    completedSessions++;
                }
            
                //Swap break status
                self.onBreak = !self.onBreak;
                //Reset timer
                setTimer();
            }
        };
        
        /**
        * @function setTimer
        * @desc Sets the timer to appropriate duration
        */
        var setTimer = function(){
            //Stop the current timer
            $interval.cancel(timer);
            
            //Determine the timer duration
            self.buttonName = "Start";
            if(self.onBreak){
                //If 4th session
                if(completedSessions % 4 === 0){
                    self.time = LONG_BREAK_TIME;
                }else{
                    self.time = BREAK_TIME;
                }
            }else{
                self.time = WORK_TIME;
            }
        };
        
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////PUBLIC//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////        
        
        
        /**************Public variables*******************/
        this.onBreak = false;
        //Current value of timer
        this.time = WORK_TIME;
        //Set button name
        this.buttonName = "Start";
        this.taskList = Tasks.all();
        
        /**************Public functions *****************/
        
        /**
        * @function startResetTimer
        * @desc Starts the countdown timer and handles resetting the timer
        */
        this.startResetTimer = function(){
            if(self.buttonName === "Start"){
                //Stop current timer
                $interval.cancel(timer);
                //Start the countdown timer
                timer = $interval(countdown, 1000);
            }else{
                setTimer();
            }
        };
        
        /**
        * @function addTask
        * @desc adds task to firebase
        */
        this.addTask = function(){
            var inputBox = document.getElementById('taskInput');
            
            if(inputBox){
                Tasks.add(inputBox.value);
                inputBox.value = "";
                inputBox.focus();
            }
        };
    };
    angular
        .module('blocTime')
        .controller('HomeCtrl', ['$interval', 'Tasks', HomeCtrl]);
})();