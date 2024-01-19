import { IsString, IsNumber, validate } from 'class-validator';

export class CreateSessionPropsValidator {
  @IsString()
  public title: string;

  @IsNumber()
  public hostId: number;

  @IsNumber()
  public maxPlayers: number;

  @IsNumber()
  public gameId: number;

  @IsString()
  public start: string;

  @IsString()
  public end: string;
}
