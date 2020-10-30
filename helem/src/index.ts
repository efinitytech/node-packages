import base from './helem';
import el from './helem/el';

const helem: any = base;
helem.el = el;

export default helem as Helem;

interface Helem {
    (): typeof helem
    el: typeof el
}
