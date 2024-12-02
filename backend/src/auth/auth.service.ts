import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(email: string, password: string) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password,
        },
      });
      if (JWT_SECRET) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: '1h',
        });
        return {
          message: 'サインアップ成功',
          user,
          token,
        };
      } else {
        throw new Error('JWT_SECRET is not defined');
      }
    } catch (error) {
      throw new Error(`サインアップに失敗しました: ${error.message}`);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }
      if (user.password !== password) {
        throw new Error('パスワードが違います');
      }
      if (JWT_SECRET) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: '1h',
        });
        return {
          message: 'サインイン成功',
          user,
          token,
        };
      } else {
        throw new Error('JWT_SECRET is not defined');
      }
    } catch (error) {
      throw new Error(`サインインに失敗しました: ${error.message}`);
    }
  }
}
