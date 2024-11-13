import { Client, Databases} from 'appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67343d41000331057c81');

export const database = new Databases(client)

