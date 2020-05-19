# qob (Query'd Observer)
Listen for DOM changes to elements that match a given query selector.

[![npm version](https://img.shields.io/npm/v/qob.svg?style=flat)](https://npmjs.org/package/qob "View this project on npm")

## API
API docs for v0.2.x.

### Functions

#### qob()
```ts
qob(
    querySelector: string, 
    callback: (matched: ObservedMutationDictionary) => void
): MutationObserver
```
Start listening for changes to the `document` and use the callback to list any changes to elements matching the query selector.  
 - `querySelector`: used to match `MutationRecords` created from DOM changes.
 - `callback`: called when the inner `MutationObserver` observes some event. Takes one `ObservedMutationDictionary` as a parameter.  

#### qob.for()
```ts
qob.for(target: Node): QOb
```
Create a new `qob` function with a non-default (`document`) scope.  
 - `target`: the new `qob` function that scopes to this element instead of the default `document`.


### Structures
```js
ObservedMutationDictionary {
    childList: MutationRecord[]
    attributes: MutationRecord[]
    characterData: MutationRecord[]
    all(): MutationRecord[]
    nodes(): Node[] 
}
```
 - `childList`: All matched `MutationRecord`s with type `"childList"`.
 - `attributes`: All matched `MutationRecord`s with type `"attributes"`.
 - `characterData`: All matched `MutationRecord`s with type `"characterData"`.
 - `all()`: All matched `MutationRecord`s.
 - `nodes()`: All nodes from `target`, `removedNodes`, and `addedNodes` found in matched `MutationRecord`s.

## Example
```js
import qob from 'qob'

qob('div#my-id', (records) => {
    // All matching events with type 'childList'
    records.childList.forEach(mutationRecord => {
        // ...
    })

    // All matching events with any type.
    const list = records.all()
    .map(mutationRecord => mutationRecord.target)

    // All affected nodes from anywhere in the matched records.
    const nodeArray = records.nodes()
})

const qobScopedToElement = qob.for(document.getElementById('example') || document)
```

## Help
See [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) MDN docs for more information about the `MutationObserver` API.