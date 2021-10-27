import { openDB } from "idb";

class Idb {
    constructor() {
        this.db = null;
    }
    init = async ( database, dataset, version=1, keyPath="id" ) => {
        this.keyPath = keyPath;
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
    getAllKeys = async (storeName) => {
        const store = this.db.transaction(storeName).objectStore(storeName);
        const keys = await store.getAllKeys();
        return keys;
    }
    get = async (id, storeName, stringify = false) => {
        const store = this.db.transaction(storeName).objectStore(storeName);
        const items = await store.get(id);
        if ( stringify ) {
            try {
                const stringified = items != undefined ? JSON.stringify(items) : undefined;
                return stringified;
            } catch {
                return undefined;
            }
        } else {
            return items
        }
    }
    put = async (obj, storeName) => {
        if (typeof obj[ this.keyPath ] === undefined) {
            console.warn(`obj needs to have a ${ this.keyPath } field!`);
            return;
        }
        const tx = this.db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await store.put({
            ...obj
        });
        await tx.done;
        return "successfully putted the item.";
    }
    set = async (obj, storeName) => {
        if (typeof obj[ this.keyPath ] === undefined) {
            console.warn(`obj needs to have a ${ this.keyPath } field!`);
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
    setArr = async ( arr, storeName ) => {
        const tx = this.db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        arr.forEach( async obj => {    
            if (typeof obj[ this.keyPath ] === undefined) {
                console.warn(`obj needs to have a ${ this.keyPath } field!`);
                return;
            }        
            await store.add({
                ...obj
            });
        });
        await tx.done;
        return "successfully added item.";
    }
    delete = async (id, storeName) => {
        const tx = this.db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await store.delete(id);
        await tx.done;
        return "successfully deleted item.";
    };
    deleteAll = async (storeName) => {
        const tx = this.db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await store.clear();
        await tx.done;
        return "successfully deleted every item.";
    }
}
export default Idb;

export const initDb = async ( idb, database, dataset, version=1, keyPath="id" ) => {
    await idb.init(database, dataset, version=1, keyPath="id");
    const data = await idb.getAll(dataset);
    return data;
}