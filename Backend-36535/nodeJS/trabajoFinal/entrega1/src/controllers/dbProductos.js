import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';

const path = dirname(fileURLToPath(import.meta.url));
const fileFolder = '../../models'
const fileName = 'dbProductos.json';

const fullName = join(path, fileFolder, fileName);
let db;

export const getConnection = async () =>
{        
    const adapter = new JSONFile(fullName);
    db = new Low(adapter);
    await db.read();
    db.data ||= { productos: [] };
    await db.write();
}

export const getData = () => db;