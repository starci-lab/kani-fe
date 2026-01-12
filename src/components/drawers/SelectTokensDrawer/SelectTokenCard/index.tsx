import { TokenSchema } from "@/modules/types"
import React from "react"
import {
    useCreateBotFormik,
    useSelectTokenDisclosure,
} from "@/hooks/singleton"
import { TokenCard } from "../../../reuseable"
export interface SelectTokenCardProps {
  token: TokenSchema;
}
export const SelectTokenCard = ({ token }: SelectTokenCardProps) => {
    const { onClose } = useSelectTokenDisclosure()
    const formik = useCreateBotFormik()
    const isDisabled =
    formik.values.targetTokenId === token.displayId ||
    formik.values.quoteTokenId === token.displayId
    const isPrimarySide = formik.values.isTargetTokenSelected
    const isSelected = isPrimarySide
        ? formik.values.targetTokenId === token.displayId
        : formik.values.quoteTokenId === token.displayId
    const isOtherSideSelected = isPrimarySide
        ? formik.values.quoteTokenId === token.displayId
        : formik.values.targetTokenId === token.displayId
    return (
        <TokenCard
            token={token}
            isDisabled={isDisabled}
            onSelect={(token) => {
                if (formik.values.isTargetTokenSelected) {
                    formik.setFieldValue("targetTokenId", token.displayId)
                } else {
                    formik.setFieldValue("quoteTokenId", token.displayId)
                }
                onClose()
            }}
            isPrimarySide={isPrimarySide}
            isOtherSideSelected={isOtherSideSelected}
            isSelected={isSelected}
            key={token.id}
        />
    )
}
