// filepath: /C:/Users/joseph.londono/Documents/Prueba Tecnica Sena/back-end/src/modules/users/users.service.ts
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

    if (userExistEmail)
      throw new ConflictException(
        'El usuario con el email proporcionado ya existe',
      );

    const newUser = this.UsersRepository.create(userFormatted);
    const userSaved = await this.UsersRepository.save(newUser);
    return userSaved;
  }

  async findUserByEmail(email: string) {
    const user = await this.UsersRepository.find({
      where: { email },
    });
    if (!user)
      throw new ConflictException(
        'El usuario con el email proporcionado no existe',
      );

    return {
      message: 'Usuario registrado',
    };
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

    if (!user) throw new ConflictException('El usuario no existe');

    const userDelete = await this.UsersRepository.delete({
      id,
    });
    if (userDelete.affected === 0)
      throw new ConflictException('El usuario no pudo ser eliminado');

    return {
      message: 'El usuario ha sido eliminado exitosamente',
    };
  }

  async updateUser(user: UserDeleteDto) {
    const userExist = await this.UsersRepository.findOne({
      where: { id: user.id },
    });

    if (!userExist) throw new ConflictException('El usuario no existe');

    const userFormatted = formattedUser(user);

    if (!userFormatted.email) {
      throw new ConflictException(
        'Debe proporcionar al menos un campo para actualizar',
      );
    }

    let userUpdate: UserDto = {
      ...userFormatted,
    } as UsersEntity;

    if (user.email) {
      // Verificar si el nuevo email es diferente al email actual
      if (user.email !== userExist.email) {
        const emailExist = await this.findUserByEmail(user.email);

        if (emailExist) throw new ConflictException('El email ya existe');

        userUpdate.email = user.email;
      }
    }

    const userUpdated = await this.UsersRepository.update(user.id, userUpdate);

    if (userUpdated.affected === 0)
      throw new ConflictException('El usuario no pudo ser actualizado');

    return {
      message: 'El usuario ha sido actualizado exitosamente',
      newDataUser: userUpdate,
    };
  }
}

function formattedUser(user: UserDeleteDto | UserDto) {
  if (user.email) user.email = user.email.trim().toLowerCase() || null;
  return user;
}
