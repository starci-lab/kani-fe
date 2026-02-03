import React, { useEffect } from "react"
import { KaniModalHeader, KaniModalBody, KaniLink, KaniSnippet, KaniButton, KaniModalFooter, KaniSpinner, KaniSkeleton } from "../../../atomic"
import { QRCode, SnippetIcon } from "../../../reuseable"
import { Spacer } from "@heroui/react"
import { truncateMiddle } from "@/modules/utils"
import { setEnableMFAPage, EnableMFAPage, useAppDispatch, useAppSelector } from "@/redux"
import { useQueryTotpSecretV2SwrMutation } from "@/hooks/singleton"

export const ScanQRPage = () => {
    const dispatch = useAppDispatch()
    const swrMutation = useQueryTotpSecretV2SwrMutation()
    const user = useAppSelector((state) => state.session.user)
    useEffect(() => {
        if (!user) {
            return
        }
        const handleEffect = async () => {
            await swrMutation.trigger()
        }
        handleEffect()
    }, [user])
    return (
        <>
            <KaniModalHeader title="Enable MFA" description={
                <div>
                    Please enter the code from your phone app like
                    <KaniLink
                        className="text-xs"
                        color="primary"
                        underline="always"
                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                        target="_blank"
                    >
                        Google Authenticator
                    </KaniLink>
                    &nbsp;or&nbsp;
                    <KaniLink
                        className="text-xs"
                        color="primary"
                        underline="always"
                        href="https://authy.com/"
                        target="_blank"
                    >
                        Authy
                    </KaniLink>
                    .
                </div>
            } />
            <KaniModalBody>
                {swrMutation.isMutating || !swrMutation.data ?
                    <div className="grid place-items-center">
                        <div
                            className="relative inline-block overflow-hidden border border-divider p-3 rounded-medium"
                        >
                            <div className="h-[150px] w-[150px] grid place-items-center">
                                <KaniSpinner />
                            </div>
                        </div>
                        <Spacer y={4} />
                        <KaniSkeleton className="h-5 w-[120px] rounded-md" />
                    </div>
                    : (
                        <div className="grid place-items-center">
                            <QRCode
                                data={swrMutation.data?.data?.totpSecretV2.data?.totpSecretUrl ?? ""}
                                size={150}
                            />
                            <Spacer y={4} />
                            <div className="flex items-center gap-2">
                                <SnippetIcon
                                    copyString={swrMutation.data?.data?.totpSecretV2.data?.totpSecret ?? ""}
                                    classNames={{ checkIcon: "w-5 h-5", copyIcon: "w-5 h-5" }}
                                />
                                <div className="text-sm">
                                    {truncateMiddle({ str: swrMutation.data?.data?.totpSecretV2.data?.totpSecret ?? "" })}
                                </div>
                            </div>
                        </div>
                    )}
            </KaniModalBody>
            <KaniModalFooter>
                <KaniButton
                    color="primary"
                    fullWidth
                    size="lg"
                    onPress={() => {
                        dispatch(setEnableMFAPage(EnableMFAPage.ConfirmTOTP))
                    }}
                >
                    Continue
                </KaniButton>
            </KaniModalFooter>
        </>
    )
}