import React, { useMemo } from "react";
import { useAppSelector } from "@/redux";
import {
    ScrollableList,
    ScrollableListSkeleton,
    TokenCard,
} from "@/components/reuseable";
import {
    useCreateBotFormik,
    useQueryStaticSwrMutation,
    useSelectTokenDisclosure,
} from "@/hooks/singleton";

export const TokensScrollShadow = () => {
    const queryStaticSwrMutation = useQueryStaticSwrMutation();
    const formik = useCreateBotFormik();
    const { onClose } = useSelectTokenDisclosure();
    const tokens = useAppSelector((state) => state.static.tokens);
    const filteredTokens = useMemo(() => {
        return tokens.filter((token) => token.chainId === formik.values.chainId);
    }, [formik.values.chainId, tokens]);
    return (
        <>
            {queryStaticSwrMutation.isLoading ? (
                <ScrollableListSkeleton />
            ) : (
                <ScrollableList
                    enableScroll={true}
                    items={filteredTokens}
                    renderItem={(token) => {
                        const isDisabled =
                            formik.values.targetTokenId === token.displayId ||
                            formik.values.quoteTokenId === token.displayId
                        const isPrimarySide = formik.values.isTargetTokenSelected
                        const isSelected = isPrimarySide ? formik.values.targetTokenId === token.displayId : formik.values.quoteTokenId === token.displayId
                        const isOtherSideSelected = isPrimarySide ? formik.values.quoteTokenId === token.displayId : formik.values.targetTokenId === token.displayId
                        return (
                            <TokenCard
                                token={token}
                                isDisabled={isDisabled}
                                onSelect={(token) => {
                                    if (formik.values.isTargetTokenSelected) {
                                        formik.setFieldValue("targetTokenId", token.displayId);
                                    } else {
                                        formik.setFieldValue("quoteTokenId", token.displayId);
                                    }
                                    onClose();
                                }}
                                isPrimarySide={isPrimarySide}
                                isOtherSideSelected={isOtherSideSelected}
                                isSelected={isSelected}
                                key={token.id}
                            />
                        );
                    }}
                />
            )}
        </>
    );
};
