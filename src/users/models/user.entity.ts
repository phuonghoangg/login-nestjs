/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  public email?: string;
 
  @Column()
  public name?: string;
 
  @Column()
  public password?: string;

  @Column({default:true})
  public isAdmin?:boolean;
}
 
export default User;