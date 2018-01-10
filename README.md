#Lux User Guide
Jan 2018

________________

Table of Contents
1.  Server-side setup
2.  Client access
3.  Project Structure
4.  Tools used
5.  Acknowledgements
6.  Contact


________________
1.  Server-side setup
The server-side runs using Node.js. The website is built with Express and the database is MySQL. There are several packages and tools in the project including pug, knex, and nodemailer which you can read more about in section 5 of this user guide. 
To setup the server-side you will need to start both the web server and the database. 

____
Starting the Web Server
1. If you don’t have Node.js installed on your computer download it here: https://nodejs.org/en/ 
2. Unzip the project file
3. Navigate to the project folder in the command line (probably cd Downloads cd lux-master)
4. Once you are in the project directory run “npm install” to install all the node modules
5. Now run “npm start” to start up the web server
Your terminal should look similar to the image below:
  
____
Starting the Database
Since the database runs MySQL, you need to launch it on your computer. While there are several ways to do this, I recommend using homebrew services. 
* If you don’t have homebrew installed on your computer, you can download it here: https://brew.sh/ 
* Once homebrew is installed, open a new command line window and run “brew services start mysql” to start mysql on your system 
   * NOTE: if you get an error saying permission denied run the command with sudo in front (“sudo brew services start mysql”) and enter your computer’s admin password
   * You can stop mysql by typing “brew services stop mysql” in the command line
While it isn’t necessary, I recommend using a helper program to provide a GUI interface of the database. I use Sequel Pro which can be downloaded here: https://www.sequelpro.com/. Once you launch Sequel Pro you will have to connect to the database. To do so fill out the details as follows: Name = lux-database,  Host = 127.0.0.1,  Username = root,  Password = zingbat123 . 
  
You can save this connection as a favorite once you connect so that you don’t have to retype these each time. Once you connect select “lux-database” from the Choose Database selector in the top left of the Sequel Pro window. 

Now you can see the users and luxes tables by clicking on them in the tables section in the middle left of the window.



________________
2.  Client Access
Once the web server and database are up and running, accessing the website is as simply as opening a web browser (Chrome, Firefox, Safari, etc) and typing “localhost:3000” in the address bar. Lux should load and look similar to the screenshot below.
  


________________
3. Project Structure

Directory / File 
What it is

	bin
	www file which app.js calls to start the server

	migrations
	Knex migrations of the MySQL queries to the database

	node_modules 
	All the various modules for the project eg: nodemailer, pug, etc

	Public → images
	favicon 

	Public → javascripts
	Where the javascripts which are called from the html files live

	Public → other
	The html for the emails formatted nicer than the single line compressed version in app.js 

	routes
	Each of the pages you can visit

	views 
	The actual HTML / Pug files that are rendered when their respective route is visited

	.gitignore
	Ignores node_modules and DS_Store from being uploaded to github

	app.js
	The main server file or mainframe of the project if you will

	knexfile.js
	The database connection info

	package-lock.json
	Just don’t worry about it 

	package.json
	The node_modules to install when npm install is run and the scripts 

	store.js
	The javascript file that app.js calls which in turn calls on knex to query the database


________________
4. Tools used
* Node.js — runs the server
* Nodemon — restarts the server for easy development
* Express — the popular web server framework 
* Express-generator — created the skeleton express setup with routes, views, etc
* Pug — formerly known as Jade, templating language so I can inject data into otherwise static HTML pages
* CSS animations from https://codemyui.com/
* jQuery — for smooth scrolling and other features
* Nodemailer — sends emails from express/node.js forms
* Cerberus  — nice html email templates (http://tedgoas.github.io/Cerberus/)
* Knex — ORM to write MySQL queries in JavaScript instead of SQL
* MySQL, Sequel Pro, Homebrew — used to run and view MySQL database 


________________
5. Acknowledgments

Lux was created as a semester culminating project of Mr. Brian Sea’s Advanced Topics in Computer Science course. I would like to acknowledge Mr. Sea for his guidance and teaching me CS (among many other things) over the years.
I was also taught CS by Mr. Steve Gregg who previously taught at Head-Royce. I would like to recognize Mr. Gregg for laying the base knowledge and seeds of CS curiosity in me.
Additionally, I would like to acknowledge these tutorials which I found very helpful in creating Lux:
Knex, MySQL Database: https://hackernoon.com/setting-up-node-js-with-a-database-part-1-3f2461bdd77f 
Structure of Express/Node.js server: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website 
Sending emails from Express/Node.js: https://appdividend.com/2017/08/11/send-email-in-node-js/ 

Finally, I would also like to thank you for your interest in my project and for reading this far in my user guide :)



________________
6. Contact 
If you have any further questions about Lux or how to use it, please email iteuscher@headroyce.org

All of the code for Lux is also available on github. My username is iteuscher. You can see the project’s code here: https://github.com/iteuscher/lux 



Thanks,
Isaac Teuscher
