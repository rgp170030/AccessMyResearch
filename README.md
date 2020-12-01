## **Access My Research**
Access My Research is being significantly overhauled to be more modern, responsive, & better documented.

## Goal
Make Access My Research functional, beautiful, and quick

## Getting Started in the CLI 
1) From the AccessMyResearch (root) directory, run "npm install"
2) Next, run "npm run dev" to build and test the code

## Useful Commands
1) npm install   - Installs all dependencies
2) npm ci        - Removes all dependencies and installs them all cleanly
3) npm run build - Builds the code
4) npm run dev   - automatically builds all changes & runs the code locally/on network
5) npm run serve - Serves the code (not going to be useful for a while)
6) npm run lint  - Starts the Vue linter

## Using Docker
- You'll need [to install docker](https://docs.docker.com/get-docker/)
- Run ``docker-compose up -d --build`` from the base directory containing the dockerfile file
- Check ``docker ps`` and see it running! You should be able to access at 127.0.0.1:8080

## File Structure
```
|-- Access My Research
    |-- .dockerignore
    |-- .editorconfig
    |-- .eslintrc.js
    |-- .gitattributes
    |-- .gitignore
    |-- .postcssrc
    |-- babel.config.js
    |-- docker-compose.yml
    |-- dockerfile
    |-- package.json
    |-- README.md
    |-- vue.config
    |-- public
    |   |-- img
    |   |   |-- brand
    |   |   |   |-- orange.png
    |   |   |   |-- white.png
    |   |   |-- SSO
    |   |   |   |-- google.svg
    |   |   |   |-- linkedin.svg
    |   |   |-- theme
    |   |   |   |-- **A bunch of placeholder images**
    |   |-- favicon.png
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- polyfills.js
        |-- assets
        |   |-- scss
        |   |   |-- core
        |   |   |-- custom
        |   |   |-- argon.scss
        |-- components
        |   |-- Badge.vue
        |   |-- BaseAlert.vue
        |   |-- BaseButton.vue
        |   |-- BaseDropdown.vue
        |   |-- BaseHeader.vue
        |   |-- BasePagination.vue
        |   |-- BaseProgress.vue
        |   |-- BaseSlider.vue
        |   |-- BaseTable.vue
        |   |-- ButtonCheckbox.vue
        |   |-- ButtonRadioGroup.vue
        |   |-- CloseButton.vue
        |   |-- index.js
        |   |-- LoadingPanel.vue
        |   |-- Modal.vue
        |   |-- NavbarToggleButton.vue
        |   |-- Breadcrumb
        |   |   |-- Breadcrumb.vue
        |   |   |-- BreadcrumbItem.vue
        |   |   |-- RouteBreadcrumb.vue
        |   |-- Cards
        |   |   |-- Card.vue
        |   |   |-- StatsCard.vue
        |   |-- Charts
        |   |   |-- BarChart.js
        |   |   |-- config.js
        |   |   |-- globalOptionsMixin.js
        |   |   |-- LineChart.js
        |   |   |-- optionHelpers.js
        |   |   |-- roundedCornersExtension.js
        |   |-- Collapse
        |   |   |-- Collapse.vue
        |   |   |-- CollapseItem.vue
        |   |-- Inputs
        |   |   |-- BaseCheckbox.vue
        |   |   |-- BaseInput.vue
        |   |   |-- BaseRadio.vue
        |   |-- Navbar
        |   |   |-- BaseNav.vue
        |   |   |-- NavbarToggleButton.vue
        |   |-- NotificationPlugin
        |   |   |-- index.js
        |   |   |-- Notification.vue
        |   |   |-- Notifications.vue
        |   |-- SidebarPlugin
        |   |   |-- index.js
        |   |   |-- SideBar.vue
        |   |   |-- SidebarItem.vue
        |   |-- Tabs
        |   |   |-- Tab.vue
        |   |   |-- Tabs.vue
        |-- directives
        |   |-- click-outside.js
        |-- plugins
        |   |-- dashboard-plugin.js
        |   |-- globalComponents.js
        |   |-- globalDirectives.js
        |-- routes
        |   |-- router.js
        |   |-- routes.js
        |-- util
        |   |-- throttle.js
        |   |-- upload.js
        |-- views
            |-- About.vue
            |-- Activity.vue
            |-- Ask.vue
            |-- Collections.vue
            |-- Contact.vue
            |-- Donate.vue
            |-- Help.vue
            |-- Home.vue
            |-- Messages.vue
            |-- NotFoundPage.vue
            |-- Notifications.vue
            |-- SearchResults.vue
            |-- Settings.vue
            |-- Upload.vue
            |-- Dashboard
            |   |-- PageVisitsTable.vue
            |   |-- SocialTrafficTable.vue
            |-- Layout
            |   |-- Content.vue
            |   |-- ContentFooter.vue
            |   |-- DashboardLayout.vue
            |   |-- DashboardNavbar.vue
            |-- Pages
            |   |-- UserProfile
            |   |   |-- EditProfileForm.vue
            |   |   |-- UserCard.vue
            |   |-- AuthLayout.vue
            |   |-- Login.vue
            |   |-- Register.vue
            |   |-- UserProfile.vue
            |-- Tables
                |-- articles.js
                |-- projects.js
                |-- users.js
                |-- LightTable.vue
```

## Important Notes
1) You may get a warning that says: "Building for production...WARNING: `text-emphasis-variant()` has been deprecated as of v4.4.0. It will be removed entirely in v5." This is okay, we will not be upgrading Bootstrap v5 any time soon. It is not even released yet.
2) Check available color variables at src\assets\custom\_variables.scss

## Original Template Information
BootstrapVue Argon Dashboard is built with over 100 individual components, giving you the freedom of choosing and combining. All components can take variations in color, that you can easily modify using SASS files.
You will save a lot of time going from prototyping to full-functional code, because all elements are implemented. This Dashboard is coming with pre-built examples, so the development process is seamless, switching from our pages to the real website is very easy to be done.
Every element has multiple states for colors, styles, hover, focus, that you can easily access and use.
- Copyright 2020 Creative Tim (https://www.creative-tim.com/?ref=bvad-github-readme)
- Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)