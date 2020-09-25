## **Access My Research**
Access My Research is being significantly overhauled to be more modern, responsive, & better documented.

## Goal
Make Access My Research functional, beautiful, and quick

## Getting Started
1) From the AccessMyResearch (root) directory, run "npm install"
2) Next, run "npm run dev" to build and test the code

## Useful Commands
1) npm install   - Installs all dependencies
2) npm run build - Builds the code
3) npm run dev   - automatically builds all changes & runs the code locally/on network
4) npm run serve - Serves the code (not going to be useful for a while)
5) npm run lint  - Starts the Vue linter

## File Structure
```
|-- Access My Research
    |-- .gitignore
    |-- .gitattributes
    |-- .postcssrc
    |-- babel.config.js
    |-- package.json
    |-- README.md
    |-- vue.config
    |-- yarn.lock
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
    |   |-- favicon.ico
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
            |-- Ask.vue
            |-- Collections.vue
            |-- Contact.vue
            |-- Help.vue
            |-- Home.vue
            |-- NotFoundPage.vue
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
                |-- projects.js
                |-- users.js
                |-- RegularTables
                |   |-- DarkTable.vue
                |   |-- LightTable.vue
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