import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRolesEnums } from '../../auth/enums/userRoles.enums';
import { UserStatus } from '../../auth/enums/userStatus.enum';

export type UsersDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  _id?: string;

  @Prop({
    get: (fullName: string) => {
      return fullName.toUpperCase();
    },
    set: (fullName: string) => {
      return fullName.trim();
    },
    required: true,
    type: String,
  })
  fullName: string;

  @Prop({
    type: String,
    enum: Object.values(UserRolesEnums),
    index: true,
    required: true,
  })
  role: UserRolesEnums;

  @Prop({
    required: false,
    index: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(UserStatus),
    required: true,
  })
  userStatus: UserStatus;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, role: 1 }, { unique: true });

export { UserSchema };
