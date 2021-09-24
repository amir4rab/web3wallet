import { openDB } from "idb";

class Idb {
    constructor() {
        this.db = null;
    }
    init = async ( database, dataset, version=1, keyPath="id" ) => {
        this.db = await openDB( database, version, {
        upgrade(db) {
            db.createObjectStore( dataset, {
                keyPath
            });
        }
        });
    };
    close = async () => {
        this.db.close();
    };
    getAll = async (storeName) => {
        const store = this.db.transaction(storeName).objectStore(storeName);
        const items = await store.getAll();
        return items;
    };
    get = async (id, storeName) => {
        const store = this.db.transaction(storeName).objectStore(storeName);
        const items = await store.get(id);
        return items;
    }
    set = async (obj, storeName) => {
        if (typeof obj.id === undefined) {
            console.warn("obj needs to have a id field!");
            return;
        }
        const tx = this.db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await store.add({
            ...obj
        });
        await tx.done;
        return "successfully added item.";
    };
    delete = async (id, storeName) => {
        const tx = this.db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await store.delete(id);
        await tx.done;
        return "successfully deleted item.";
    };
}
export default Idb;

export const initDb = async ( idb, database, dataset, version=1, keyPath="id" ) => {
    await idb.init(database, dataset, version=1, keyPath="id");
    const data = await idb.getAll(dataset);
    return data;
}