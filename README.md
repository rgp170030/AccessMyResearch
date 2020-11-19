# **Access My Research**
AccessMyResearch is a BootstrapVue + Vue.js web application designed to connect users with researchers, increase access to publications, & act as a space for teams to work on research-related projects.

# AccessMyResearch Goals
AccessMyResearch aims to increase the accessibility of research to all people
1. It is free for anyone to create an account and start finding publications.
1. Users can gain access to publications and research from academics from all over the world.
1. Users can ask questions and discuss projects with experts from top universities
1. A user can organize inspiring publications into shareable, named collections
1. A user can organize projects with other users where the group's research can be uploaded

# Getting Started in the CLI 
1. Clone the code from the github repo (https://github.com/AccessMyResearch/AccessMyResearch.git) Find out [how to clone the repo here](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Using-Git).
1. From the AccessMyResearch (root) directory, run `npm install`
1. Run `npm install @vue/cli -g` to install the Vue CLI
1. Finally, run `npm run dev` to build and test the code
> Once The dependencies are installed, you just need to run `npm run dev` when you want to build and test the code

# Useful Commands
1. `npm install` - Installs all dependencies
1. `npm ci` - Removes all dependencies and installs them all cleanly
1. `npm run build` - Builds the code
1. `npm run dev` - Automatically builds all changes & runs the code locally/on network
1. `npm test` - Runs the code test suites (with Jest)
1. `npm run serve` - Serves the code (not going to be useful for a while)
1. `npm run lint` - Starts the Vue linter

# Getting Started with Docker
1. You'll need [to install docker](https://docs.docker.com/get-docker/) ([Windows](https://docs.docker.com/docker-for-windows/install), [macOS](https://docs.docker.com/docker-for-mac/install), [Linux](https://docs.docker.com/engine/install))
1. Run `docker-compose up -d --build` from the base directory containing the dockerfile file

   > Now, you should be able to access the web app at `127.0.0.1:8080`.

   > Check `docker ps` to see it running! 
# **[AccessMyResearch Wiki](https://github.com/AccessMyResearch/AccessMyResearch/wiki)**
Contributing | Codebase
------------- | -------------
**[Using Git](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Using-Git)** | **[Core Technologies & Dependencies](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Core-Technologies-&-Dependencies)**
**[Getting Started](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Getting-Started)** | **[Containerized Virtualization with Docker](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Containerized-virtualization-with-Docker)**
**[How to Contribute](https://github.com/AccessMyResearch/AccessMyResearch/wiki/How-to-Contribute)** | **[Server Hosting by AWS](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Server-Hosting-by-AWS)**
**[Project Files](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Project-Files)** | **[Elasticsearch](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Elasticsearch)**
**[Solving Common Issues](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Solving-Common-Issues)** | **[Testing with Jest](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Testing-with-Jest)**
# Important Notes
1) You may get a warning that says: "Building for production...WARNING: `text-emphasis-variant()` has been deprecated as of v4.4.0. It will be removed entirely in v5." This is okay, we will not be upgrading Bootstrap v5 any time soon. It is not even released yet.
2) Check available color variables at src\assets\custom\_variables.scss
3) Comments indicating what needs to be done should begin with "TODO" so these comments can be quickly searched for
4) Unit testing is done through Jest. Documentation here: https://jestjs.io/
