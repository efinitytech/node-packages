# forkey
Map actions to keys in KeyboardEvents.  

[![npm version](https://img.shields.io/npm/v/@efinitytech/forkey.svg?style=flat)](https://npmjs.org/package/@efinitytech/forkey "View this project on npm")

## Usage
`forkey(km: KeyMap): (e: KeyboardEvent) => void` 

The declaration for `KeyMap` looks like:
```ts
type KeyMap = { [key: string]: boolean | FunctionAcceptsKeyboardEventReturnsBoolean };
```
If a *key* matches `event.key` or `event.code`, it will run the associated function. If the function returns `true`, it will call `event.preventDefault()`. Or, if a boolean value is provided instead of the function, `true` will call `event.preventDefault()`.

### Browser
```html
<input id="target" />

<script>
    // preventDefault() on Enter key.
    const fn = forkey({
        'Enter': true
    });

    document.getElementById('#target')
        .addEventListenter('keydown', fn);
</script>
```

### JSX
```jsx
import forkey from 'forkey';


// in markup:
<input onKeydown={forkey({ 
    // Case-insensitive. Evaluating to true calls preventDefault on the event.
    'enter': true,

    // Custom handler.
    ShiftLeft(e) => {
        console.log('event:', e);

        // Returning true will also call preventDefault on the event.
        return true;
    }
})} />
```
