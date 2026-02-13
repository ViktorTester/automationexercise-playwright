import { ApiBlock} from "./ApiBlock";
import type { RequestClient } from '../RequestClient';

export class AccountBlock extends ApiBlock {
  constructor(client: RequestClient) {
    super(client);
  }
}