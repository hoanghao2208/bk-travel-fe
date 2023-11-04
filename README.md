# Source definition for the format of the source files

> This document describes the format of the source files.
>
> Developers should read this document to understand the format of the source files.

## Overview

The source files are organized in the following way:

-   .vscode
    -   settings.json: contain the settings for the VSCode editor
    -   tasks.json: contain the tasks for the VSCode editor
-   docs
    -   [documentName].md: the document file
-   public
    -   assets
        -   fonts: contain the fonts
    -   index.html: the main HTML file
    -   favicon.ico: the favicon
    -   ...
-   scripts
    -   [scriptName].sh: the script file to build the project or something else
-   src
    -   icons: contain the icons
    -   components: contain the components
    -   contexts: contain the contexts
    -   enums: contain the enums
    -   hooks: contain the common hooks
    -   route: contain the route config
    -   scss: contain the scss files
    -   services: contain the services
    -   store: contain the store config
        -   reducers
        -   Store.ts: contains the store config
        -   types.ts: declare types and interfaces for the store
    -   translations: contain the translations
    -   utils: contain the common utils
    -   views: contain the views
    -   App.jsx: the main component
    -   index.jsx: the main entry point
-   templates: contain the templates for react-tool-cli
-   .env: the environment variables
-   .eslintrc.js: the ESLint config
-   .gitignore: the git ignore config
-   package.json
-   prettier.config.js: the Prettier config
-   README.md: the README file
-   tsconfig.json: the TypeScript config

## public/assets/fonts

Add the fonts here.

-   [fontName]
    -   [fontName]Bold.ttf
    -   [fontName]Medium.ttf
    -   [fontName]Regular.ttf
    -   [fontName]SemiBold.ttf

## public/assets/icons

All icons in projects

## src/components

Add the components here.

-   [componentName]
    -   index.[tsx|jsx]: tsx for TypeScript, jsx for JavaScript, TypeScript is recommended
    -   index.scss
    -   types.ts: required if the component is defined in TypeScript
    -   Context.tsx: optional
    -   other files: optional, recommend to try to keep the component as simple as possible
-   index.ts: export all components
-   index.scss: import all component's scss files

## src/contexts

Add an common context here if the context is used in many views or components.

-   [contextName]
    -   components
        -   any item that related to the context (e.g. the modal, the form, etc.)
    -   index.tsx: the context entry point, handle action and data
    -   Provider.tsx: the context provider
    -   types.ts: declare types and interfaces for the context

## src/scss

-   [scssName].scss: some utils scss files
-   index.scss: import all scss files

## src/services

-   modules
    -   [moduleName].ts: the module file
-   [serviceName]
    -   [serviceName].ts: the service file
    -   types.ts: declare types and interfaces for the service

## src/store/reducers

-   [reducerName]
    -   constants.ts: contains the constants for the reducer
    -   functions.ts: contains the functions, hooks to get end set data
    -   index.ts: contains the export of the reducer
    -   reducer.ts: contains the reducer logic
    -   types.ts: declare types and interfaces for the reducer
-   index.ts: contains the export of a list of reducers

## src/utils

-   constants.ts: contains the constants to be used in the project
-   function
    -   medicalMethod.ts: contains the functions that related to medical.
    -   time.ts: contains the functions that related to time (e.g. format time, get time, etc.)
    -   validate.ts: contains the functions that related to validate (e.g. validate email, validate phone number, etc.)
    -   format.ts: contains the functions that related to format (e.g. format phone number, format money, etc.)
-   projectConfig.ts: contains all the constants that related to the project, e.g. the role and permission of the project

## src/views

-   [viewName]
    -   index.jsx: the view entry point, handle load and process data here
    -   Inner.jsx: the view component, handle the UI here
    -   [viewName].scss: the view scss file
-   index.scss: import all view's scss files
