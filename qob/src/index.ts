import MutationObserver from 'mutation-observer';

interface ObservedMutationDictionary {
    childList: MutationRecord[]
    attributes: MutationRecord[]
    characterData: MutationRecord[]
    all(): MutationRecord[]
    nodes(): Node[]
}

interface QOb {
    (qs: string, cb: (rec: ObservedMutationDictionary) => void): MutationObserver
    for(target: Node): (qs: string, cb: (rec: ObservedMutationDictionary) => void) => MutationObserver
}

const nodeArray = (list: NodeList) => Array.prototype.slice.call(list);

/**
 * Searches addedNodes, removedNodes, and targets of MutationRecords for elements matching the given query string.
 * @param qs A query selector.
 * @param cb A callback function for all matching MutationRecords.
 */
const create = (target: Node) => (qs: string, cb: (rec: ObservedMutationDictionary) => void) => {
    if (!cb) {
        throw "Callback parameter is required."
    }
    const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        const result: ObservedMutationDictionary = {
            childList: [],
            attributes: [],
            characterData: [],
            all() {
                const { attributes, characterData, childList } = this;
                return [...attributes, ...characterData, ...childList];
            },
            nodes() {
                return this.all().flatMap(i => [
                    ...nodeArray(i.addedNodes),
                    ...nodeArray(i.removedNodes),
                    i.target])
            }
        }

        // Check each mutation for matching elements
        mutations.forEach(mutation => {
            const canValidateTarget =
                () => mutation.target instanceof HTMLElement && mutation.target.matches(qs);
            const inAddedNodes =
                () => !!nodeArray(mutation.addedNodes)
                    .find(n => n instanceof HTMLElement && n.matches(qs));
            const inRemovedNodes =
                () => !!nodeArray(mutation.removedNodes)
                    .find(n => n instanceof HTMLElement && n.matches(qs));
            if (canValidateTarget() || inAddedNodes() || inRemovedNodes()) {
                result[mutation.type].push(mutation);
            }
        })

        // Return results
        cb(result);
    });
    observer.observe(target, {
        subtree: true,
        attributes: true,
        childList: true,
        characterData: true
    })
    return observer;
}

const qob = ((): QOb => {
    const res: any = create(document);
    res.for = create;
    return res;
})()

export default qob;
