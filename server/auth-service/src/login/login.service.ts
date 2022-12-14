import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginLocalUserDTO } from 'src/common';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../../../common/database/user.entity';
import { ErrorCodes } from '../../../common/errors/LoginError.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokensEntity } from '../../../common/database/refreshToken.entity';
@Injectable()
export class LoginService {
    private logger: Logger;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userEnitity: Repository<UserEntity>,
        @InjectRepository(RefreshTokensEntity)
        private readonly refreshTokensEntity: Repository<RefreshTokensEntity>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        this.logger = new Logger(LoginService.name);
    }

    public async loginLocalUser(loginUserBody: LoginLocalUserDTO) {
        try {
            const user = await this.userEnitity.findOne({
                where: {
                    email: loginUserBody.email,
                },
                relations: {
                    password: true,
                    accountDetails: true,
                },
                select: {
                    accountDetails: {
                        isActive: true,
                        isEmailConfirmed: true,
                    },
                    password: {
                        passwordHash: true,
                        needsToBeChanged: true,
                    },
                    id: true,
                },
            });
            if (user === null) {
                throw new NotFoundException(ErrorCodes.login.userNotFound);
            }
            if (!user.accountDetails.isActive) {
                throw new ForbiddenException(
                    ErrorCodes.login.userAccountNotActice
                );
            }
            if (
                bcrypt.compare(
                    loginUserBody.password,
                    user.password.passwordHash
                )
            ) {
                const accessToken = this.jwtService.sign({
                    id: user.id,
                    isEmailConfirmes: user.accountDetails.isEmailConfirmed,
                    shouldPasswordChange: user.password.needsToBeChanged,
                });
                await this.createRefreshTokenWithHsh(user.id, accessToken);
            }
        } catch (error) {
            this.logger.error({
                method: this.loginLocalUser.name,
                error,
            });
            throw error;
        }
    }

    private async createRefreshTokenWithHsh(
        userId: number,
        accessToken: string
    ): Promise<string> {
        try {
            const refreshToken = this.jwtService.sign(
                { id: userId },
                {
                    expiresIn: this.configService.get(
                        'JWT_REFRESH_TOKEN_EXPIRES'
                    ),
                    secret: this.configService.get('JWT_REFRESH_TOKEN_HASH'),
                }
            );

            this.logger.log({
                method: this.createRefreshTokenWithHsh.name,
                message: `created refresh token for user ${userId}`,
            });

            const refreshTokenHash = bcrypt.hashSync(
                refreshToken,
                bcrypt.genSaltSync()
            );

            const refreshTokenForDB = this.refreshTokensEntity.create({
                token: accessToken,
                refreshTokenHash,
            });
            await this.userEnitity.update(
                { id: userId },
                {
                    password: {
                        refreshToken: {
                            ...refreshTokenForDB,
                        },
                    },
                }
            );
            this.logger.log({
                method: this.createRefreshTokenWithHsh.name,
                message: `updated database refresh token for user ${userId}`,
            });
            return refreshToken;
        } catch (error) {
            this.logger.error({
                method: this.createRefreshTokenWithHsh.name,
                error: error?.message,
            });
            throw new InternalServerErrorException();
        }
    }
}
