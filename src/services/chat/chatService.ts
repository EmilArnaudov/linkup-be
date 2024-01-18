import { AppDataSource } from '@/data-source';
import { Message } from '@/entities/Message.entity';
import { createMessageProps } from './chatService.types';
import { Session } from '@/entities/Session.entity';
import { User } from '@/entities/User.entity';
import { io } from '@/index';

const messageRepository = AppDataSource.getRepository(Message);
const sessionRepository = AppDataSource.getRepository(Session);
const userRepository = AppDataSource.getRepository(User);

export async function createMessage({
  senderId,
  sessionId,
  content,
}: createMessageProps): Promise<Message> {
  const message = new Message();
  const sender = await userRepository.findOneOrFail({
    where: { id: senderId },
  });
  const session = await sessionRepository.findOneOrFail({
    where: { id: sessionId },
  });

  message.content = content;
  message.session = session;
  message.sender = sender;

  const savedMessage = messageRepository.save(message);
  io.to(String(sessionId)).emit('newMessage', savedMessage);
  return savedMessage;
}
