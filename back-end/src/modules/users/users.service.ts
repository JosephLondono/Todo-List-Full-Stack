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
    const userFormatted = formattedUser(user);
    const userExistEmail = await this.findUserByEmail(userFormatted.email);

    if (userExistEmail.length !== 0)
      throw new ConflictException(
        'The user with the email provided already exists',
      );

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

  async getUsers() {
    return await this.UsersRepository.find({
      select: ['id', 'email'],
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

    if (!userFormatted.email && !userFormatted.password) {
      throw new ConflictException(
        'You must provide at least one field to update',
      );
    }

    let userUpdate: UserDto = {
      ...userFormatted,
    } as UsersEntity;

    if (user.email) {
      // Verificar si el nuevo email es diferente al email actual
      if (user.email !== userExist.email) {
        const emailExist = await this.findUserByEmail(user.email);

        if (emailExist.length !== 0)
          throw new ConflictException('The email already exists');

        userUpdate.email = user.email;
      }
    }

    if (user.password) {
      const userWithPasswordEncrypted = await encryptPassword(user);
      userUpdate.password = userWithPasswordEncrypted.password;
    }

    const userUpdated = await this.UsersRepository.update(user.id, userUpdate);

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
  if (user.email) user.email = user.email.trim().toLowerCase() || null;
  if (user.password) user.password = user.password.trim() || null;

  return user;
}

function formattedUsersWhitoutPassword(user: UsersEntity) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
