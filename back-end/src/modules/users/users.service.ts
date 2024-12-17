import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserDeleteDto } from './dto/user-delete.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(user: UserDto) {
    const userExistEmail = await this.findUserByEmail(user.email);

    if (userExistEmail.length !== 0)
      throw new ConflictException(
        'The user with the email provided already exists',
      );

    const userExistUsername = await this.findUserByUsername(user.username);

    if (userExistUsername.length !== 0)
      throw new ConflictException(
        'The user with the username provided already exists',
      );

    const userFormatted = formattedUser(user);

    const userWithPasswordEncrypted = await encryptPassword(userFormatted);
    const newUser = this.UsersRepository.create(userWithPasswordEncrypted);
    const userSaved = await this.UsersRepository.save(newUser);
    const userWithoutPassword = formattedUsersWhitoutPassword(userSaved);
    return userWithoutPassword;
  }

  async findUserByEmail(email: string) {
    const user = await this.UsersRepository.find({
      where: { email },
    });
    if (!user)
      throw new ConflictException(
        'El usuario con el email proporcionado no existe',
      );

    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.UsersRepository.find({
      where: { username },
    });
    if (!user)
      throw new ConflictException(
        'El usuario con el username proporcionado no existe',
      );

    return user;
  }

  async getUsers() {
    return await this.UsersRepository.find({
      select: ['id', 'username', 'email'],
    });
  }

  async clearUsers() {
    await this.UsersRepository.clear();

    return true;
  }

  async deleteUserById(id: number) {
    const user = await this.UsersRepository.findOne({
      where: { id },
    });

    if (!user) throw new ConflictException('The user does not exist');

    const userDelete = await this.UsersRepository.delete({
      id,
    });
    if (userDelete.affected === 0)
      throw new ConflictException('The user could not be deleted');

    return {
      message: 'The user has been deleted successfully',
    };
  }

  async updateUser(user: UserDeleteDto) {
    const userExist = await this.UsersRepository.findOne({
      where: { id: user.id },
    });

    if (!userExist) throw new ConflictException('The user does not exist');

    const userFormatted = formattedUser(user);

    let userUpdate: UsersEntity = {
      ...userFormatted,
    } as UsersEntity;
    if (user.username) userUpdate.username = user.username;
    if (user.email) userUpdate.email = user.email;
    if (user.password) {
      const userWithPasswordEncrypted = await encryptPassword(user);
      userUpdate.password = userWithPasswordEncrypted.password;
    }

    const userUpdated = await this.UsersRepository.update(user.id, userUpdate);

    console.log(userUpdated);

    if (userUpdated.affected === 0)
      throw new ConflictException('The user could not be updated');

    return {
      message: 'The user has been updated successfully',
      newDataUser: formattedUsersWhitoutPassword(userUpdate),
    };
  }
}

async function encryptPassword(user: UserDto | UserDeleteDto) {
  const passwordSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(user.password, passwordSalt);
  user.password = passwordHash;
  return user;
}

function formattedUser(user: UserDeleteDto | UserDto) {
  if (user.email) user.email = user.email.trim();
  if (user.username) user.username = user.username.trim();
  if (user.password) user.password = user.password.trim();

  return user;
}

function formattedUsersWhitoutPassword(user: UsersEntity) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
