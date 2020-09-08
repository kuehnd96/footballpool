# footballpool
A React single page web application for making football picks.

As the last part of my [React training](https://github.com/kuehnd96/LearnReact) I decided to build (from scratch) a web front end of a football pool that I have been participating in for years. I will start with mapping out my entities and designing screen layouts. From there I will plan my components and code the web app in VS Code. Finally I will gain some experience with CI & CD by creating a pipeline in Azure Devops to build and deploy the app to Azure. I plan to use Contentful for my backend. While there is a concept of user roles I won't implement authorization or authentication at this time. I will use Bootstrap for CSS only since my CSS skills aren't great right now.

This app does not handle money, contain any copyrighted material, and does not promote gambling in any way. I will put everything I can into this repo to share my journey. I will update this readme as I go.

### What does this site do?
This site will allow a user to join a league and pick winners of football games before the season begins. When making the pick the user must assign a point value to each pick that indicates the user's confidence in the pick. For example, if there are 17 games to pick winners for the user must assign each point value of 1-17 to their picks without repeating a point value. During the season the league users are scored by earning points. If the football game pick is correct the user gets the point value assigned to the pick. Whoever has the most points at the end of the season wins the league.

### 2/4/2020
After a much-needed break from coding outside of work for the holidays I am back at it with enthusiasm. I used the design pad that I got for Windows 8 at the Build conference in 2012 to draw some rough designs of the screens that will make up this web app. I also planned out my entities and their relationships.

I also made the decisions to use React Icons, React Router, and React Context in this application. (I am thinking a nice future project would be replacing React Context with Redux.)

Here are the design files that were added:

1. SiteMap.jpg is a picture of the screen map for this site. I drew this on my whiteboard in my office and used Office Lens to take this picture. The user will land at the home screen and go to other screens depending on what task they wish to conduct.

1. Menu.jpg is a sketch of the menu that will appear on every screen. Different tasks will appear depending on the role of the user.

1. HomeScreen.jpg is a sketch of the screen the user will initially see. This screen will show the user their leagues that are in progress and which leagues they need to make picks for.

1. LeagueDetailScreen.jpg is a sketch of the screen that shows the details of a user's league that is in-progress. The user can see how many points they have earned and their placing in the league. The user can see all of their future picks and point values but they won't be able to see any future points or picks for anyone else in the league.

1. CreateSeasonScreen.jpg is a sketch of the screen used by an admin user to create a new season. This screen is used to enter the matchups for a football season. This task would be done once a year.

1. UpdateSeasonScreen.jpb is a sketch of the screen used to update a season's matchups as the season goes along. This task would take place once a week during the season. I already have the urge to figure out a way to automate the creation and update of a season but it is outside of the scope of my React training.

1. JoinLeagueScreen.jpg is a sketch of the screen used for a user to make their matchup picks and assign their point values for a league they are joining. Again, once a league begins these picks and point values cannot be changed.

Next up I need to brush up a bit on using the Contentful site and programming against it, then I will add some data to contentful for the site to use, and then do some research on using React Content. I will be coding soon!

### 2/17/2020
I have spent time the last couple of weeks defining the structure of my data and creating data for this React app on the [Contentful](https://www.contentful.com/) web site. Contentful is an API-first CMS that I used during my last React exercise to store some data for the app I created. I would recommend it for a central place to put some data for any type of software application.

I also created the bare-bones React application tonight. I have to brush up on my React context and then I will be ready to start coding this application.

### 3/8/2020

I am having a ton of fun creating my first React app. I am coding on Sunday and Tuesday nights and am on the lookout for more time during the week to code. With a very demanding client at work and my duties as a husband and father my programming time is limited these days. I have also been thinking of some educational exercises I could do down the road with this app that would help me learn more about the React world. These include replacing the Contentful backend with a Node JS backend, replacing React Context with Redux, using more React Hooks, and upping my CSS game with some design and styling. Once again there are so many things to do and learn with programming but not enough time outside of work to do it.

### 4/14/2020

I hope everyone is doing well and staying healthy during this pandemic. There have been many times when I thought it would help to just put this React training aside but I have decided to keep going. I think coding this application in React is proving to be a coping mechanism during these tough times. I urge anyone out there to find what helps them get through these tought times as well.

Lately I have been working on the screen that allows a user to join a league by making their picks and assigning point values. The algorithm for validating that the user has assigned point values 1-17 to 17 matchups is something I have thought about even before my React training. I am excited to jump into it tonight. Be well.

### 5/12/2020

I took last week off from coding. I think I needed it to come back to it this week. I am determined to keep going on this app and finish my React training. I have a Dev Ops book awaiting me next. I hope everyone is staying safe and healthy during this pandemic.

### 9/7/2020

I had to take some time away from my React training after making some great progress on this in late June and early July. The break was for 1) getting situated at a new client at work where I will be learning a bunch of new tech and 2) to research, rehearse, and give a talk to my co-workers on the basics of modern authentication in software development. I am back now and looking to finish this application ... and the React training I started a year ago (almost to the day). Before November I also plan to 1) secure this application with an authorization code OpenId Connect flow using the free tier of Auth0 and 2) set up CI and CD of this application on Azure DevOps. I like my chance of getting this done in the next 7 or so weeks. Coding on a Monday night again feels good.
