import Entity from "../classes/entity.class";
import StaticObject from "../classes/static-object.class";

export interface IEntityCollision {
    collisionArea: number,
    collidingObject: StaticObject | Entity
}