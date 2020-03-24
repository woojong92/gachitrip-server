import { 
    BaseEntity, 
    CreateDateColumn,
    Entity, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @OneToMany(type => Message, message => message.chat)
    message: Message[];

    @OneToMany(type => User, user => user.chat)
    participants: User[];

    @CreateDateColumn() createdAt: string;

    @UpdateDateColumn() updatedAt: string;
    messages: any;
}

export default Chat;