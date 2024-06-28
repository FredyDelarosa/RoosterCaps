import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

export class UserRepository {

  public static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, role_id_fk, user_name FROM user', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }

  public static async findById(user_id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE user_id = ?', [user_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByUserName(user_name: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE user_name = ?', [user_name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO user (user_name, role_id_fk, password) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.user_name, user.role_id_fk, user.password], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, user_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateUser(user_id: number, userData: User): Promise<User | null> {
    const query = 'UPDATE user SET user_name = ?, role_id_fk = ?, password = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userData.user_name, userData.role_id_fk, userData.password, user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUser: User = { ...userData, user_id: user_id };
            resolve(updatedUser);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(user_id: number): Promise<boolean> {
    const query = 'DELETE FROM user WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

}
