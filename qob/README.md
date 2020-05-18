# qob (Query'd Observer)
Listen for DOM changes to elements that match a given query selector.

## API
```js
qob(
    querySelector: string, 
    callback: (matched: ObservedMutationDictionary) => void
) => MutationObserver
```
 - `querySelector`: used to match `MutationRecords` created from DOM changes.
 - `callback`: called when the inner `MutationObserver` observes some event. Takes one `ObservedMutationDictionary` as a parameter.  

```js
ObservedMutationDictionary {
    childList: MutationRecord[];
    attributes: MutationRecord[];
    characterData: MutationRecord[];
    all(): MutationRecord[];
    nodes(): Node[];
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
    const nodeArray = records.nodes();
})
```