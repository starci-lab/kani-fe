import { KaniChip, KaniImage, KaniLink, KaniSpinner, KaniTooltip } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import React from "react"
import { useAppSelector } from "@/redux"
import { SealCheckIcon } from "@phosphor-icons/react"
import { round, toDecimalAmount, truncateMiddle } from "@/modules/utils"
import BN from "bn.js"
import Decimal from "decimal.js"

export const WithdrawalExecuting = () => {
    const confirmWithdrawal = useAppSelector((state) => state.socket.confirmWithdrawal)
    const tokens = useAppSelector((state) => state.static.tokens)
    const withdrawToken = confirmWithdrawal?.receivedTokens[0]
    const _token = tokens.find((t) => t.id === withdrawToken?.id)
    return (
        <>
            {!confirmWithdrawal ? (
                <div className="flex flex-col items-center justify-center h-[200px]">
                    <KaniSpinner variant="wave" />
                    <Spacer y={4} />
                    <div className="text-foreground-500 text-center text-sm">Processing withdrawal...</div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <SealCheckIcon weight="fill" className="text-success w-20 h-20" />
                    <Spacer y={3} />
                    <div className="text-foreground-500 text-center text-sm">Withdrawal successful</div>
                    <Spacer y={3} />
                    {
                        _token && (
                            <KaniChip
                                variant="flat"
                                color="default"
                                startContent={<KaniImage src={_token?.iconUrl} className="w-5 h-5" />}
                            >
                                <span>
                                    {round(toDecimalAmount({ amount: new BN(withdrawToken?.amount ?? 0), decimals: new Decimal(_token?.decimals ?? 0) }))} {_token?.symbol}
                                </span>
                            </KaniChip>
                        )
                    }
                    <Spacer y={3} />
                    <div className="flex items-center gap-2">
                        <KaniLink
                            href={`https://${process.env.NEXT_PUBLIC_BASE_URL}/wallet`}
                            target="_blank"
                            color="foreground"
                            className="text-sm text-foreground-500"
                            isExternal
                            underline="hover"
                        >
                            {`${truncateMiddle({ str: confirmWithdrawal?.txHashes[0] ?? "", front: 6, back: 4 })}`}
                        </KaniLink>
                        <KaniTooltip
                            content={
                                <div className="text-sm flex flex-col gap-1">
                                    {
                                        confirmWithdrawal.txHashes.map((txHash) => (
                                            <KaniLink underline="hover" key={txHash} className="text-sm text-end" color="foreground" href={`https://${process.env.NEXT_PUBLIC_BASE_URL}/wallet`} target="_blank" isExternal>
                                                {truncateMiddle({ str: txHash, front: 6, back: 4 })}
                                            </KaniLink>
                                        ))
                                    }
                                </div>
                            }
                        >
                            <KaniChip color="default" variant="flat" className="text-sm p-0 h-6 cursor-pointer">
                                +{confirmWithdrawal.txHashes.length - 1}
                            </KaniChip>
                        </KaniTooltip>
                    </div>
                </div>
            )
            }
        </>
    )
}