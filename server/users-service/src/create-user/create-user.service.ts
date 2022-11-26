import { Injectable, Logger } from '@nestjs/common'
import { RegisterUserDTO } from '../../../common/DTO/user/registerUser.dto'
import { User } from '../../../common/database/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)

    constructor(
        @InjectRepository(User)
        private userEntity: Repository<User>
    ) {}

    public async createLocalUser(props: RegisterUserDTO) {
        try {
            const databaseUser = this.userEntity.create(props)
            await this.checkIfUserExist(props.email)
            return await this.userEntity.save(databaseUser)
        } catch (error) {
            this.logger.error({
                method: 'createLocalUser',
                error,
            })
        }
    }

    /**
     * Check if user already exist in database
     * @param email string user emails
     * @returns
     */
    public async checkIfUserExist(email: string): Promise<boolean> {
        try {
            this.logger.debug({
                method: 'checkIfUserExist',
                message: `looking for user with mail ${email}`,
            })
            const founduser = await this.userEntity.findOne({
                where: { email },
            })
            this.logger.log(
                `user with email: ${email}, was found: ${!founduser}`
            )
            return !founduser
        } catch (error) {
            this.logger.error({
                method: 'checkIfUserExist',
                error,
            })
            throw new Error(`could not find user with email: ${email}`)
        }
    }
}
