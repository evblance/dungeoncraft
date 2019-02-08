import { IBoundingRect } from '../../interfaces/bounding-rect.interface';

export default class _Collision {

    public static getCollidingArea(first: IBoundingRect, second: IBoundingRect): number {
        const xOverlap = Math.max(0, Math.min(second.RIGHT, first.RIGHT) - Math.max(second.LEFT, first.LEFT));
        const yOverlap = Math.max(0, Math.min(second.BOTTOM, first.BOTTOM) - Math.max(second.TOP, first.TOP));
        return Math.max(0, xOverlap * yOverlap);
    }

}