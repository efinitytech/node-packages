import base from './helem';
import el from './helem/el';

interface Helem {
    (): typeof helem
    el: typeof el
}

const helem: any = base;
helem.el = el;

export default helem as Helem;
