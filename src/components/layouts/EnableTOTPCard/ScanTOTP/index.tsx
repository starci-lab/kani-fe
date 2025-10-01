import {
    KaniButton,
    KaniCardBody,
    KaniCardFooter,
    KaniCardHeader,
    KaniLink,
} from "../../../atomic"
import { QRCode } from "../../../reuseable"
import { EnableTOTPCardPage, setEnableTOTPCard, useAppDispatch, useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"

export const ScanTOTP = () => {
    const user = useAppSelector((state) => state.session.user)
    const secret = user?.temporaryTotpToken
    const issuer = "Kani"
    const label = user?.email || "example@gmail.com"
    const otpAuthUri = `otpauth://totp/${encodeURIComponent(
        issuer
    )}:${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(
        issuer
    )}`
    const dispatch = useAppDispatch()   
    return (
        <>
            <KaniCardHeader
                title="Enable TOTP"
                description={
                    <div>
                        Please scan the given QR code from a phone app like
                        <KaniLink
                            className="text-foreground-500 text-xs"
                            color="foreground"
                            underline="always"
                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                            target="_blank"
                        >
                            Google Authenticator
                        </KaniLink>
                        &nbsp;or&nbsp;
                        <KaniLink
                            className="text-foreground-500 text-xs"
                            color="foreground"
                            underline="always"
                            href="https://authy.com/"
                            target="_blank"
                        >
                            Authy
                        </KaniLink>
                        .
                    </div>
                }
            />
            <KaniCardBody>
                <Spacer y={6} />
                <div className="flex justify-center">
                    <QRCode data={otpAuthUri} size={200} />
                </div>
                <Spacer y={6} />
            </KaniCardBody>
            <KaniCardFooter>
                <KaniButton fullWidth color="primary" onPress={() => {
                    dispatch(setEnableTOTPCard(EnableTOTPCardPage.VerifyTOTP))
                }}>
                    Verify
                </KaniButton>
            </KaniCardFooter>
        </>
    )
}