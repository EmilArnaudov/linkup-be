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

  @IsNumber()
  public start: number;

  @IsNumber()
  public end: number;

  // Add more properties and decorators as needed
}

// interface CreateSessionProps {
//   title: string;
//   maxPlayers: number;
//   game: string;
//   start: number;
//   end: number;
//   hostId: number;
// }
