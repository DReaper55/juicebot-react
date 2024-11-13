import FirebaseService from '../services/FirebaseService.js';

class FirebaseDBService {
    constructor() {
        this.database = new FirebaseService().database;
    }

    async createData(path, data) {
        try {
            if(data.dateCreated === undefined && data.lastModified !== undefined){
                data.dateCreated = new Date()
            }

            await this.database.ref(path).set(data);
            console.info('Data successfully written!');
        } catch (error) {
            console.error('Error writing data: ', error);
        }
    }

    async readData(path) {
        try {
            const snapshot = await this.database.ref(path).once('value');
            return snapshot.val();
        } catch (error) {
            console.error('Error getting data: ', error);
        }
    }

    async updateData(path, data) {
        try {
            await this.database.ref(path).update(data);
            console.info('Data successfully updated!');
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    }

    async deleteData(path) {
        try {
            await this.database.ref(path).remove();
            console.info('Data successfully deleted!');
        } catch (error) {
            console.error('Error deleting data: ', error);
        }
    }
}

export default FirebaseDBService;
