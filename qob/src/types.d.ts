declare module 'mutation-observer';

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
