import {
    ConflictException,
    HttpStatus,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common'
import { RegisterUserDTO } from '../../../common/DTO/user/registerUser.dto'
import { User } from '../../../common/database/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserErrorsE } from '../../../common/errors/UserError.enum'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
@Injectable()
export class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)

    constructor(
        @InjectRepository(User)
        private userEntity: Repository<User>,

        @Inject('AUTH_SERVICE')
        private authService: ClientProxy
    ) {}

    /**
     *
     * Saves user local user into database
     *      *
     * @returns http status
     */
    public async createLocalUser(props: RegisterUserDTO) {
        try {
            //   if user exists
            if (await this.checkIfUserExist(props.email))
                throw new Error(UserErrorsE.userExists)
            const databaseUser = this.userEntity.create(props)
            const passwordHash = await this.getUserPasswordHash(props.password)
            await this.userEntity.save(databaseUser)
            return HttpStatus.CREATED
        } catch (error) {
            this.logger.error({
                method: 'createLocalUser',
                error: [error.message] ? [error.message] : error,
            })
            //throws proper errors
            if (error?.message === UserErrorsE.userExists)
                //user exists can not be created
                throw new ConflictException('user already exists')
            else throw new InternalServerErrorException()
        }
    }

    /**
     * Check if user already exist in database
     * @param email string user emails
     * @returns true if user exists | false if does not
     */
    public async checkIfUserExist(email: string): Promise<boolean> {
        try {
            this.logger.debug({
                method: 'checkIfUserExist',
                message: `looking for user with mail ${email}`,
            })
            const foundUser = await this.userEntity.findOne({
                where: { email },
            })

            this.logger.log(
                `user with email: ${email}, was found: ${foundUser !== null}`
            )
            return foundUser !== null
        } catch (error) {
            this.logger.error({
                method: 'checkIfUserExist',
                error,
            })
            throw new Error(`could not find user with email: ${email}`)
        }
    }

    /**
     * Sends request with password to receive hashed pass
     * @param password
     * @returns
     */
    private async getUserPasswordHash(password: string): Promise<string> {
        try {
            return await firstValueFrom(
                this.authService.send({ cmd: `hash_password` }, { password })
            )
        } catch (error) {
            this.logger.error({
                method: 'getUserPasswordHash',
                error,
            })
            throw new InternalServerErrorException()
        }
    }
}
