## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    
    - `cd reader-cli`
    - `npm install`
    - `npm start`

* That is the project structure :

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── api-server # API server provided by Udacity to complete this project. Available in [README file](api-server/README.md). 
└── reader-cli
    ├── public
        ├── favicon.ico # Favico from project
        ├── index.css # Main CSS file
        ├── index.html # Main HTML file from project
        ├── manifest.json # Manifest file
    ├── src     
        ├── actions
            ├── index.js #Actions creator used in project
            ├── types.js #Provide all actions used in project
        ├── api
            ├── api.ico # All APIs used in project
        ├── components
            ├── AllPostsPage.js #Component used as bridge to display all posts in a single page
            ├── App.js #Main component
            ├── Comment.js #Component used to Show a comment
            ├── FormComment.js #Form to new comment
            ├── Header.js #Header component of Project
            ├── ListComment.js #Component used to list all comments
            ├── ListPost.js #Component used to list all Posts
            ├── Post.js #Component used to display a single post
            ├── PostByCategory.js #Component used to list posts using Categories as filter
            ├── ListComment.js #Component used to list all comments
            ├── SinglePost.js #Component used to display a single Post
        ├── reducers
            ├── index.js # Reducers from project    
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── registerServiceWorker.js # registerServiceWorker created by create-react-app
    ├── index.js # Main index from React project
```
