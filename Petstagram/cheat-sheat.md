# Cheat Sheet

1. Initialize project and start structure: 
    * npm init --yes
    * src > index.js
2. Setup dev environment:
    * npm i -D nodemon
    * in package.json delete "test" and write "start": "nodemon src/index.js" (log server start and test)
3. Install and setup express: 
    * npm i express
    * add static middleware: app.use(express.static('public')); src>public
    * add body parser: app.use(express.urlencoded({extended: false}));
    * add routes: src>routes.js
4. Add static resources: (get the static ones and put them in the public folder)
5. Add views folder with ready htmls: src>views
6. Add express-handlebars view engine
    * npm i express-handlebars
    * add to express
    * config handlebars
    * config views folder
    * add main layout: views > layouts > main.hbs and add repetitive content (beginning to header + {{{body}}} + footer)
    * add partials folder
    * render home page (change the extension to hbs)
    * fix static paths
    * render home page
7. Add controllers folder with home controller 
8. Add database
    * npm i mongoose
    * connect database
9. Authentication
    * add user controller
    * add controller to routes
    * fix header navigation to log and register
    * render login page
    * views > users > login, register and logout
    * change routes in main.hbs
    * render register page
10. Add user model:
    * src > models > userModel
    * add unique index for username
    * validate repeat password
11. Add user manager:
    * src > manager > userManager
    * require in user controller
12. Modify login and register forms:
    * change methods to POST
    * write name of every input
    * change hrefs
13. Add login and register post actons
14. Implement user manager login register methods
15. Hash password
    * npm i bcrypt
    * hash password
16. Login
    * find user by username
    * Validate password with hash
17. Generate jwt token
    * npm i jsonwebtoken
    * promisify jsonwebtoken
    * src > lib > jwt.js
    * create secret
    * generate token in manager.login
18. Return token in cookie
    * npm i cookie-parser
    * config cookie parser
    * set cookie with token
19. Logout
20. Authentication middleware
    * src > middlewares > authmiddleware.js
    * create base middleware
    * use middleware
    * implement auth middleware
    * attach decoded token to req
    * handle invalid token
21. Authorization middleware
22. Dynamic navigation
    * add conditional in main.hbs
    * add to res locals
23. Error handling
    * add global error handler (optional)
    * add 404 page: delete "static" word, change href
    * add redirect in the routes

    
