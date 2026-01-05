import { ChainId } from "../blockchain"

export interface PositionSchema {
    id: string; // Mongo _id
  
    openTxHash: string;
  
    liquidityPool: string; // ObjectId as string or expanded object if populated
  
    snapshotTargetBalanceAmountBeforeOpen: string;
    snapshotQuoteBalanceAmountBeforeOpen: string;
    snapshotGasBalanceAmountBeforeOpen?: string;
  
    snapshotTargetBalanceAmountAfterClose?: string;
    snapshotQuoteBalanceAmountAfterClose?: string;
    snapshotGasBalanceAmountAfterClose?: string;
  
    liquidity?: string;
    tickLower?: number;
    tickUpper?: number;
  
    amountA?: string;
    amountB?: string;
  
    minBinId?: number;
    maxBinId?: number;
  
    bot: string; // ObjectId as string or expanded object if populated
    chainId: ChainId;
    targetIsA: boolean;
  
    positionOpenedAt: Date;
    positionId?: string;
    isActive?: boolean;
  
    closeTxHash?: string;
    positionClosedAt?: Date;
  
    roi?: number;
    pnl?: number;
  
    metadata?: unknown; // flexible JSON
  
    feeAmountTarget: string;
    feeAmountQuote: string;
  
    isSimulated?: boolean;
  
    createdAt: Date;
    updatedAt: Date;

    positionValueAtClose: number
    positionValueAtOpen: number
  }