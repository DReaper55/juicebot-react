import { Database } from 'firebase-admin/database';
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

            await this.database.ref(path).set(data);
            console.info('Data successfully written!');
        } catch (error) {
            console.error('Error writing data: ', error);
        }
    }

    async readData(path: string): Promise<Map<string, object>[] | undefined> {
        try {
            const snapshot = await this.database.ref(path).once('value');
            return snapshot.val();
        } catch (error) {
            console.error('Error getting data: ', error);
        }
    }

    async updateData(path: string, data: Data): Promise<void> {
        try {
            await this.database.ref(path).update(data);
            console.info('Data successfully updated!');
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    }

    async deleteData(path: string): Promise<void> {
        try {
            await this.database.ref(path).remove();
            console.info('Data successfully deleted!');
        } catch (error) {
            console.error('Error deleting data: ', error);
        }
    }
}

export default FirebaseDBService;
