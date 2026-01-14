import { DocumentNode, gql } from "@apollo/client"
import { createNoCacheCredentialAuthClientWithToken } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation BackupBotPrivateKeyV2($request: BackupBotPrivateKeyV2Request!) {
    backupBotPrivateKeyV2(request: $request) {
      message
      success
      error
      data {
        privateKey
      }
    }
  }
`

export enum MutationBackupBotPrivateKeyV2 {
  Mutation1 = "mutation1",
}

export interface MutationBackupBotPrivateKeyV2Request {
  botId: string;
}

export interface MutationBackupBotPrivateKeyV2Response {
  privateKey: string;
}

const mutationMap: Record<MutationBackupBotPrivateKeyV2, DocumentNode> = {
    [MutationBackupBotPrivateKeyV2.Mutation1]: mutation1,
}

export type MutationBackupBotPrivateKeyV2Params = MutationParams<MutationBackupBotPrivateKeyV2, MutationBackupBotPrivateKeyV2Request>;

export const mutationBackupBotPrivateKeyV2 = async ({
    mutation = MutationBackupBotPrivateKeyV2.Mutation1,
    token,
    request,
}: MutationBackupBotPrivateKeyV2Params) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithToken(token).mutate<{
        backupBotPrivateKeyV2: GraphQLResponse<MutationBackupBotPrivateKeyV2Response>,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}
