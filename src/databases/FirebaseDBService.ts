import { Database, ref, set, get, update, remove } from 'firebase/database';
import FirebaseService from '../services/FirebaseService';

interface Data {
    dateCreated?: Date;
    lastModified?: Date;
    [key: string]: object | undefined;
}

class FirebaseDBService {
    private database: Database;

    constructor() {
        this.database = FirebaseService.getInstance().database!;
    }

    async createData(path: string, data: Data): Promise<void> {
        try {
            if (data.dateCreated === undefined && data.lastModified !== undefined) {
                data.dateCreated = new Date();
            }

            const dataRef = ref(this.database, path);
            await set(dataRef, data);
            console.info('Data successfully written!');
        } catch (error) {
            console.error('Error writing data: ', error);
        }
    }

    async readData(path: string): Promise<Map<string, object>[] | undefined> {
        try {
            const dataRef = ref(this.database, path);
            const snapshot = await get(dataRef);
            return snapshot.exists() ? snapshot.val() : undefined;
        } catch (error) {
            console.error('Error getting data: ', error);
        }
    }

    async updateData(path: string, data: Data): Promise<void> {
        try {
            const dataRef = ref(this.database, path);
            await update(dataRef, data);
            console.info('Data successfully updated!');
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    }

    async deleteData(path: string): Promise<void> {
        try {
            const dataRef = ref(this.database, path);
            await remove(dataRef);
            console.info('Data successfully deleted!');
        } catch (error) {
            console.error('Error deleting data: ', error);
        }
    }
}

export default FirebaseDBService;
