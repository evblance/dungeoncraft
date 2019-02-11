import GameObject from './game-object.class';

export default class GameWorld {

    private context: GameObject[];

    public getContext(): GameObject[] {
        return this.context;
    }

    public getGameObjectById(id: string): GameObject | null {
        for (let obj of this.context) {
            if (obj.getId() === id) {
                return obj;
            }
        }
        return null;
    }

    public getGameObjectByClass(className: any): GameObject | null {
        for (let obj of this.context) {
            if (obj instanceof className) {
                return obj;
            }
        }
        return null;
    }

    public getGameObjectsByClass(className: any): GameObject[] | null {
        const results: GameObject[] = new Array<GameObject>();
        this.context.forEach(gameObject => {
            if (gameObject instanceof className) {
                results.push(gameObject);
            }
        });
        return results.length ? results : null;
    }

    public getGameObjectsByName(name: string): GameObject[] | null {
        const results: GameObject[] = new Array<GameObject>();
        this.context.forEach(gameObject => {
            if (gameObject.getName() === name) {
                results.push(gameObject);
            }
        });
        return results.length ? results : null;
    }

    constructor(
        context: GameObject[] = new Array<GameObject>()
    ) {
        this.context = context;
    }
}