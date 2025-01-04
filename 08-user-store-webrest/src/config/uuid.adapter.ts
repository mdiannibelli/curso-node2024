import { v4 as uuidv4 } from 'uuid';

export class UUIDAdapter {
    static generateV4 = () => uuidv4();
}