# forkey

## Usage

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
