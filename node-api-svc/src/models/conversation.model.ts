import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "conversations",
})

export default class Conversation extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "sender"
  })
  sender!: string;

  @Column({
    type: DataType.STRING(255),
    field: "receiver"
  })
  receiver!: string;

  @Column({
    type: DataType.STRING(255),
    field: "value"
  })
  value?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "is_deleted"
  })
  deleted?: boolean;

  @Column({
    type: DataType.DATE,
    field: "created_at"
  })
  createdAt?: boolean;

  @Column({
    type: DataType.STRING(255),
    field: "created_by"
  })
  createdBy?: string;

  @Column({
    type: DataType.DATE,
    field: "updated_at"
  })
  updatedAt?: boolean;

}