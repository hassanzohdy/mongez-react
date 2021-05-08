# React Mongez

A powerful React Js Application Manager that allow you to ship your app rapidly and with a very high quality of file structure performance and neat code structure. 

# Installation

`yarn add mongez`

OR 

`npm i mongez`

# Table Of Contents
- [Introduction](#react-mongez)
- [Installation](#installation)
- [Apps & Modules System](#apps-modules-system)
- [Tables](#tables)
- [Forms](#forms)
- [Components](#components)
- [Hooks](#hooks)
- [Admin](#admin)
- [Events System](#events)
- [Bus Manager](#bus-manager)
- [HTTP && Api Endpoints](#http-endpoints)
- [Layout](#layout)
- [Routing](#routing)   
   - [Lazy Modules](#lazy-modules)
   - [Middleware](#middleware)
   - [Unified Layouts](#unified-layouts)
- [Localization & Translations](#localization)
- [Command Line](#command-line)
- [User](#user)
- [Utilities](#utils)
- [tips](#tips)
- [Command Line](#command-line)
   - (Wizard Command Line)(#wizard-command-line)
- [Fresh Projects](#fresh-projects)
- [Todo](#todo)


# Tips

- Always use latest React Js Version.
- Use Typescript With React Instead of Javascript.
- This package heavily relies on [Material UI](https://material-ui.com/), give it a try.

# Command Line

Mongez provides list of command lines that will help utilize your app rapidly.

## Wizard Command Line
Command: `mongez wizard`

Mongez Wizard is mainly built for creating admin/front-office modules that allow you to create a full module with bunch of inputs.

Another Main Feature to `Mongez Wizard` is to allow you clone existing modules that are usually used in most of web applications either in the admin dashboard or in the website itself.

### Wizard Options
- Clone Modules
- Create Admin Module
- Create Front Office Module

### Wizard Usage
Update your `package.json` and add to `scripts` key `wizard: "mongez wizard"

So your package.json file should look like:

```json
{
   ...
   "scripts": {
      ...
      "wizard": "mognez wizard"
   }
}
```

Now run `yarn wizard` or `npm run wizard` based on your node package manager.

This command will open a new browser window with list of options.

# Fresh Projects

If you're going to start a new project, it's recommended to use [Mongez React Starter Project](https://github.com/hassanzohdy/mongez-react-start-project).

# Todo

- Enhance Documentation.
- Create Props Interface for each component. 
- StoryBooks. 
- File Manager.
- Sortable Admin Table.
- Enhance User Group permissions.
- Encrypted Cache.
- Create Bus Manager.
- CLI
   - Application Build
- SSR?
- Ideal Image Component, See [An Almost Ideal React Image Component](https://css-tricks.com/an-almost-ideal-react-image-component/).
- Enhance Events System by creating a self-contained subscriber to be unsubscribed on component unmounting.