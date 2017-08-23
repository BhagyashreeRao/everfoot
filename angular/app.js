
var myApp = angular.module('matches',['ngRoute']); 
myApp.controller('mainController',['$http','$location','$filter',function($http,$location,$filter) {
//create a context
var main = this;
this.matches1 = [];
this.matches2 = [];
this.rounds1= [];
this.rounds2=[];
this.name1='';
this.name2='';
this.allMatches=[];
this.totalMatches=[];
this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
this.baseUrl2 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
this.teams=[];
this.years=[2015,2016,2017];
this.matchId="";
this.query='';
this.queryBy='';


this.loadAllMatches = function(){
Promise.all([
      $http({
        method: 'GET',
        url: main.baseUrl1
      }).then(function successCallback(response) {
          console.log(response);
          main.name1=response.data.name;
          main.rounds1=response.data.rounds;


        for(var i in response.data.rounds)
        { 
          
    
        
     
          for(var j in response.data.rounds[i].matches)
          {
                    
            main.matches1.push(response.data.rounds[i].matches[j]);
            main.allMatches.push(response.data.rounds[i].matches[j]);
       
          }
         }

        }, 
         function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error stat
         alert("some error occurred. Check the console.");
         console.log(response);
       }),

      $http({
      method: 'GET',
      url: main.baseUrl2
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        // main.matches = response.data.rounds[0].matches ;
        //console.log(response.data.name);
        //console.log(main.matches);
        main.name2=response.data.name;
        main.rounds2=response.data.rounds;
        for(var i in response.data.rounds)
        { 
         
    
         
          for(var j in response.data.rounds[i].matches)
          {
             main.matches2.push(response.data.rounds[i].matches[j]);
             main.allMatches.push(response.data.rounds[i].matches[j]);

              
            }
        } 
           for(var x in main.allMatches)
        {
          if(main.teams.indexOf(main.allMatches[x].team1.name) === -1){
          main.teams.push(main.allMatches[x].team1.name);
         
            
        }


      }

       }, 
        
        function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
        alert("some error occurred. Check the console.");
        console.log(response);
        })
      ]).then(function()
      {
        
       
      }
      );
      };
      this.loadAllMatches();
      this.getData=function(id1,id2,season)
      {
        main.matchId=(season+"+"+id1+"+"+id2);
        //alert(id1+","+id2+","+season);

        $location.path("match/"+season+"+"+id1+"+"+id2);

      };
     
      
    }]); // end controller

myApp.controller('currentMatchController',['$http','$location',function($http,$location) {
// i knew the result is going to be array, so i declared an empty array to initialize
var main=this;
this.match={};
this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
this.baseUrl2 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
this.league='';
this.matchDay='';
var season='';
var pIndex=0;
var index=0;

this.loadCurrentMatch=function()
{
  var path=$location.path();
  var res=path.split("/");
  var matchId=res[res.length-1];

  var res1=[];
  res1=matchId.split("+");
 
  season=res1[0];
  pIndex=res1[1];
  index=res1[2];

  if(season==="S01")
  {

    $http({
        method: 'GET',
        url: main.baseUrl1
      }).then(function successCallback(response) {
  
          console.log(response);
          main.league=response.data.name;
          for(var i in response.data.rounds)
          { console.log(pIndex);
            if(i===pIndex)
            {
              main.matchDay=response.data.rounds[i].name;
              //console.log(matchDay);

              for(var j in response.data.rounds[i].matches)
              { 
                console.log(index);
                if(j===index)
                {
                  main.match=response.data.rounds[i].matches[j];
                  console.log(main.match);
                  break;

                }
              }
              break;
            }
          }

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
    }
    if(season==="S02")
  {

    $http({
        method: 'GET',
        url: main.baseUrl2
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.league=response.data.name;
          for(var i in response.data.rounds)
          { console.log(pIndex);
            if(i===pIndex)
            {
              main.matchDay=response.data.rounds[i].name;
              //console.log(matchDay);

              for(var j in response.data.rounds[i].matches)
              { 
                console.log(index);
                if(j===index)
                {
                  main.match=response.data.rounds[i].matches[j];
                  console.log(main.match);
                  break;

                }
              }
              break;
            }
          }

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
    }

};
}]);

     
  
myApp.controller('statisticsController',['$http',function($http) {
//create a context
var main = this;
// i knew the result is going to be array, so i declared an empty array to initialize

this.matches1=[];
this.matches2=[];
this.teams1=[];
this.teams2=[];
this.name1='';
this.name2='';
this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
this.baseUrl2 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
this.teamStats1=[];
this.teamStats2=[];
this.totalMatches=[];
this.wins=[];
this.losses=[];
this.draws=[];
this.totalScores=[];
this.loadStatistics = function(){
  
Promise.all([
      $http({
        method: 'GET',
        url: main.baseUrl1
      }).then(function successCallback(response) {
          console.log(response);

        for(var i in response.data.rounds)
        { 
            main.name1=response.data.name;
   

         for(var j in response.data.rounds[i].matches)
          {
            main.matches1.push(response.data.rounds[i].matches[j]);

            if(main.teams1.indexOf(response.data.rounds[i].matches[j].team1.name) === -1)
            {
              main.teams1.push(response.data.rounds[i].matches[j].team1.name);
            }
          }
        }

        for(var y in main.teams1)
        { main.totalMatches[y]=0;
          main.wins[y]=0;
          main.losses[y]=0;
          main.draws[y]=0;
          main.totalScores[y]=0;
          for(var z in main.matches1)
          {
            if(main.teams1[y]===main.matches1[z].team1.name || main.teams1[y]===main.matches1[z].team2.name )
            {
              main.totalMatches[y]++;


            }
            if((main.teams1[y]===main.matches1[z].team1.name && main.matches1[z].score1>main.matches1[z].score2) || (main.teams1[y]===main.matches1[z].team2.name && main.matches1[z].score2>main.matches1[z].score1))
            {            
              main.wins[y]++;
            }
          
            if((main.teams1[y]===main.matches1[z].team1.name && main.matches1[z].score1<main.matches1[z].score2) || (main.teams1[y]===main.matches1[z].team2.name && main.matches1[z].score2<main.matches1[z].score1))
            {            
              main.losses[y]++;
            }  
            if((main.teams1[y]===main.matches1[z].team1.name && main.matches1[z].score1===main.matches1[z].score2) || (main.teams1[y]===main.matches1[z].team2.name && main.matches1[z].score2===main.matches1[z].score1))
            {            
              main.draws[y]++;
            }
            if(main.teams1[y]===main.matches1[z].team1.name)
            {
              main.totalScores[y]=main.totalScores[y]+main.matches1[z].score1;
            }
            else if(main.teams1[y]===main.matches1[z].team2.name)
            {
              main.totalScores[y]=main.totalScores[y]+main.matches1[z].score2;
            }
        }
        }
    

  for(var l in main.teams1)
         {
          main.teamStats1.push({ teamName:main.teams1[l],
                                matchesPlayed:main.totalMatches[l],
                                matchesWon:main.wins[l],
                                matchesLost:main.losses[l],
                                matchesDrawn:main.draws[l],
                                scoresMade:main.totalScores[l]

         });
    } 
    console.log(main.teamStats1);


       }, 
         function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error stat
         alert("some error occurred. Check the console.");
         console.log(response);
       }),

      $http({
      method: 'GET',
      url: main.baseUrl2
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        // main.matches = response.data.rounds[0].matches ;
        //console.log(response.data.name);
        //console.log(main.matches);
     
        for(var i in response.data.rounds)
        { 
          
          main.name2=response.data.name;
              
          for(var j in response.data.rounds[i].matches)
          {
            main.matches2.push(response.data.rounds[i].matches[j]);
            if(main.teams2.indexOf(response.data.rounds[i].matches[j].team1.name) === -1)
            {
              main.teams2.push(response.data.rounds[i].matches[j].team1.name);
            
            }
        
          }
        } 
      
      
        for(var x in main.matches2)
        {
          if(main.teams2.indexOf(main.matches2[x].team1.name) === -1){
          main.teams2.push(main.matches2[x].team1.name);
            
        }
      }
      

        for(var y in main.teams2)
        { main.totalMatches[y]=0;
          main.wins[y]=0;
          main.losses[y]=0;
          main.draws[y]=0;
          main.totalScores[y]=0;
          for(var z in main.matches2)
          {
            if(main.teams2[y]===main.matches2[z].team1.name || main.teams2[y]===main.matches2[z].team2.name )
            {
              main.totalMatches[y]++;


            }
            if((main.teams2[y]===main.matches2[z].team1.name && main.matches2[z].score1>main.matches2[z].score2) || (main.teams2[y]===main.matches2[z].team2.name && main.matches2[z].score2>main.matches2[z].score1))
            {            
              main.wins[y]++;
            }
          
            if((main.teams2[y]===main.matches2[z].team1.name && main.matches2[z].score1<main.matches2[z].score2) || (main.teams2[y]===main.matches2[z].team2.name && main.matches2[z].score2<main.matches2[z].score1))
            {            
              main.losses[y]++;
            }  
            if((main.teams2[y]===main.matches2[z].team1.name && main.matches2[z].score1===main.matches2[z].score2) || (main.teams2[y]===main.matches2[z].team2.name && main.matches2[z].score2===main.matches2[z].score1))
            {            
              main.draws[y]++;
            }
            if(main.teams2[y]===main.matches2[z].team1.name)
            {
              main.totalScores[y]=main.totalScores[y]+main.matches2[z].score1;
            }
            else if(main.teams2[y]===main.matches2[z].team2.name)
            {
              main.totalScores[y]=main.totalScores[y]+main.matches2[z].score2;
            }
        }
        }
       

  for(var l in main.teams2)
         {
          main.teamStats2.push({ teamName:main.teams2[l],
                                matchesPlayed:main.totalMatches[l],
                                matchesWon:main.wins[l],
                                matchesLost:main.losses[l],
                                matchesDrawn:main.draws[l],
                                scoresMade:main.totalScores[l]

         });
         }
   
                
     }, 
        
        function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
        alert("some error occurred. Check the console.");
        console.log(response);
        })
      ]).then(function()
      {
    
        console.log(main.teamStats1);
        console.log(main.teamStats2);

       
      });
      

      };
    }]); // end controller    


