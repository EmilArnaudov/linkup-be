import { IsString, IsNumber, validate } from 'class-validator';

export class CreateMessageValidator {
  @IsString()
  public content: string;

  @IsNumber()
  public senderId: number;
}
