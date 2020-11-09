import base, { Helem } from './helem';
import el from './helem/el';

const helem: any = base;
helem.el = el;

export default helem as HelemModule;

interface HelemModule extends Helem {
    el: typeof el
}
