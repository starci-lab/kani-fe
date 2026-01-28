import React from "react"
import { useQueryTotpSecretSwrMutation } from "@/hooks/singleton"
import { KaniModalHeader, KaniModalBody, KaniLink, KaniSnippet, KaniButton, KaniModalFooter } from "../../../atomic"
import { QRCode } from "../../../reuseable"
import { Spacer } from "@heroui/react"
import { truncateMiddle } from "@/modules/utils"
import { setEnableMFAPage, EnableMFAPage, useAppDispatch } from "@/redux"

export const ScanQRPage = () => {
    const queryTotpSecretMutation = useQueryTotpSecretSwrMutation()
    const dispatch = useAppDispatch()
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
                {queryTotpSecretMutation.data?.data?.totpSecret?.data?.totpSecret && (
                    <div className="grid place-items-center">
                        <QRCode
                            data={queryTotpSecretMutation.data?.data?.totpSecret?.data?.totpSecretUrl ?? ""}
                            size={150}
                        />
                        <Spacer y={4} />
                        <KaniSnippet
                            hideSymbol
                            codeString={queryTotpSecretMutation.data?.data?.totpSecret?.data?.totpSecret ?? ""}
                        >
                            {truncateMiddle({ str: queryTotpSecretMutation.data?.data?.totpSecret?.data?.totpSecret ?? "" })}
                        </KaniSnippet>
                    </div>
                )}
            </KaniModalBody>
            <KaniModalFooter>
                <KaniButton
                    color="primary"
                    fullWidth
                    size="lg"
                    onPress={() => {
                        dispatch(setEnableMFAPage(EnableMFAPage.InputTOTP))
                    }}
                >
                    Continue
                </KaniButton>
            </KaniModalFooter>
        </>
    )
}