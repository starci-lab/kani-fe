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
    formik.values.targetTokenId === token.id ||
    formik.values.quoteTokenId === token.id
    const isPrimarySide = formik.values.isTargetTokenSelected
    const isSelected = isPrimarySide
        ? formik.values.targetTokenId === token.id
        : formik.values.quoteTokenId === token.id
    const isOtherSideSelected = isPrimarySide
        ? formik.values.quoteTokenId === token.id
        : formik.values.targetTokenId === token.id
    return (
        <TokenCard
            token={token}
            isDisabled={isDisabled}
            onSelect={(token) => {
                if (formik.values.isTargetTokenSelected) {
                    formik.setFieldValue("targetTokenId", token.id)
                } else {
                    formik.setFieldValue("quoteTokenId", token.id)
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
