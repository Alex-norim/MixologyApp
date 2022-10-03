# MixologyApp
the application to store and share hookah recipes.
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Pages](#pages)
* [Setup](#setup)
## General info
This project was created as personal spot where i can store hookah recipes that were found by me to taste it.
In the future i am gonna put it online , so that others could store good recipes. 
	
## Technologies
Project is created with:
* express version: 4.17.3
* native javascript : 
* passport.js: 0.6.0
* handlebars : 4.2.0
* bcrypt : 5.0.1
* mysql2 : 2.3.3

## Features
Class 'createElement' takes an object that has next keys:
  tagname : (type:string), should be html tag name,
  attr : (type:obj) it includes keys as css property name but values are correct css values,
  content : (type:string) optional key to add some text content inside a created element,
  handler : (type:obj) the key of this object should be event type name but value is a function,
## Pages
__1.Home__ - defoult menu section that opens as the app is loaded(not realized completely )
2.Mixology - main section of this app , customers can view all recipes the database has in current time.
Also customer can view specifyc recipes that proveded by taste in mixology menu.
Authorized user can like a mix , it automatically saves recipe in favorite list.
3.Articles - this section provides articles uploaded by users who have decided to share opinions or give an advice of improving a smoking process
4.Cabinet - this section has your personal information and favorite mix list.
## Setup
To run this project do next steps:

```
$ download files from this repository
$ open it by your text editor
$ install dependencies
$ launch server using command yarn sever/npm run server
$ you will see in terminal an address , follow this link
$ the application runs on default browser
```