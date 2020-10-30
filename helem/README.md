# Helem
Create DOM elements in one step.  

[![npm version](https://img.shields.io/npm/v/helem.svg?style=flat-square)](https://npmjs.org/package/@efinitytech/helem "View this project on npm")

## Installation
 - `npm i helem` for webpack/your favorite web-bundler.
 - `<script src="https://unpkg.com/@efinitytech/helem/dist/web">` for browser iife library.


## Usage
Behaves like `document.createElement`, but allows you to provide attributes, events, and children on initialization.  

```js
const element = helem.el('div', { 
    props: { 
        innerHTML: '<h1>Hello there</h1>' 
    },
    events: {
        'mouseover': () => element.style.color = 'blue'
    }
}, [
    helem.el('p', [ 'This is Helem.' ])
])

document.body.appendChild(element);
```


## Features


### Basic elements
Use `helem.el` to create an element:  

```js
const element = helem.el('div', {
    props: {
        id: 'example-div'
    }
}, [
    helem.el('h1', ['Hello there']),
    helem.el('button', {
        props: {
            style: {
                border: 'none',
                padding: '0.5rem'
            },
            innerText: 'Click me'
        },
        attr: {
            // ... for `Element.setAttribute`
        },
        events: {
            'click': [
                () => console.log('clicked!'),
                (e) => e.target.after(
                    helem.el('span', {
                        props: {
                            dataset: {
                                clicked: Date.now()
                            }
                        }
                    }, ['You clicked the button.'])
                )
            ]
        }   
    })
]);

document.body.appendChild(element);
```


### Resuable Element Creator
Use `helem` to create a creator function with css support:  

```js
var create = helem('div', { 
    css: {
        '': {
            padding: '1rem',
        },
        '> h1': {
            fontSize: '1rem',
            color: 'blue'
        }
    }
}, [
    helem('h1', ['I am an HTMLHeadingElement']),
    'I am a Text node.'
])

document.body.appendChild(create())
document.body.appendChild(create())
document.body.appendChild(create())
```


### TypeScript support
Use the type parameter on `helem` or `helem.el` to specify the type of element you are creating. This will provide more accurate suggestions for the `attr` field:  

```ts
import helem from 'helem';

const div: HTMLDivElement = helem.el<HTMLDivElement>('div', { 
    // ...
})
```
