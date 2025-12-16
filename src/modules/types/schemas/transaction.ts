import { ChainId } from "../blockchain"
import { TransactionType } from "./enums"

export interface TransactionSchema {
    id: string; // Mongo _id
    txHash: string;
    bot: string;
    chainId: ChainId;
    type: TransactionType;
    timestamp: Date;
  }