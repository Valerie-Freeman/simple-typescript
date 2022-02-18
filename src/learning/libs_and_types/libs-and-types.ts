// We use a lot of third party packages when we build apps. Some packages include type definitions 
// and some don't. When a package doesn't provide type definitions, we can try to install types from
// from the DefinitelyTyped repo by running the following command: npm i -D @types/npm-package-name


// example, Apollo client comes with it's own type package. npm i -S apollo-client
import ApolloClient from 'apollo-client'
// when we hover over ApolloClient, we can see its type
// we can command + click to see the .d.ts file for Apollo client

// a package that doesn't include types is react
// npm i -S react


// with react you have to install the package

// import React from 'react' 
// React.someFn()

//When we hover over 'react' it gives us this warning

// Could not find a declaration file for module 'react'. 
// '/Users/val/Code/simple-typescript/node_modules/react/index.js' implicitly has an 'any' type.
// Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) 
// file containing `declare module 'react';`

// first try the first suggestion. We usually save types as dev dependency

// if it doesn't have its own types package, we need to add a new declaration files (.d.ts)
// so we would create react.d.ts