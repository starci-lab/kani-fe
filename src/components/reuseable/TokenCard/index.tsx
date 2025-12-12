import React from "react";
import { TokenSchema } from "@/modules/types";
import {
  KaniAvatar,
  KaniCard,
  KaniCardBody,
  KaniSnippet,
} from "@/components/atomic";
import { centerPad } from "@/modules/utils";
import { cn } from "@heroui/react";

export interface TokenCardProps {
  token: TokenSchema;
  onSelect: (token: TokenSchema) => void;
  isSelected: boolean;
  isOtherSideSelected: boolean;
  isDisabled: boolean;
  isPrimarySide: boolean;
}

export const TokenCard = ({
  token,
  onSelect,
  isSelected,
  isOtherSideSelected,
  isDisabled,
  isPrimarySide,
}: TokenCardProps) => {
  return (
    <KaniCard
      isDisabled={isDisabled}
      onPress={() => onSelect(token)}
      isPressable={!isDisabled}
      shadow="none"
      className={cn(
        "border border-default",
        isPrimarySide ?
        {
            "border-primary border-2": isSelected,
            "border-secondary border-2": isOtherSideSelected,
        } :
        {
            "border-secondary border-2": isSelected,
            "border-primary border-2": isOtherSideSelected,
        }
      )}
    >
      <KaniCardBody>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 grid grid-cols-3">
            <div className="flex items-center gap-2">
              <KaniAvatar
                src={token.iconUrl}
                classNames={{
                  base: "w-10 h-10 min-w-10 min-h-10",
                }}
                radius="full"
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm">{token.name}</div>
                <div className="text-xs text-foreground-500">
                  {token.symbol}
                </div>
              </div>
            </div>
          </div>
          {token.tokenAddress && (
            <>
              <KaniSnippet codeString={token.tokenAddress} hideSymbol>
                {centerPad(token.tokenAddress, 6, 4)}
              </KaniSnippet>
            </>
          )}
        </div>
      </KaniCardBody>
    </KaniCard>
  );
};
