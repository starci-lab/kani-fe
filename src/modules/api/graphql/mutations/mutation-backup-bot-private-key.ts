import { DocumentNode, gql } from "@apollo/client"
import { createNoCacheCredentialAuthClientWithTokenAndHeaders } from "../clients"
import { GraphQLResponse, MutationParams } from "../types"

const mutation1 = gql`
  mutation BackupBotPrivateKey($request: BackupBotPrivateKeyRequest!) {
    backupBotPrivateKey(request: $request) {
      message
      success
      error
      data {
        privateKey
      }
    }
  }
`

export enum MutationBackupBotPrivateKey {
  Mutation1 = "mutation1",
}

export interface MutationBackupBotPrivateKeyRequest {
  botId: string;
}

export interface MutationBackupBotPrivateKeyResponse {
  privateKey: string;
}

const mutationMap: Record<MutationBackupBotPrivateKey, DocumentNode> = {
    [MutationBackupBotPrivateKey.Mutation1]: mutation1,
}

export type MutationBackupBotPrivateKeyParams = MutationParams<MutationBackupBotPrivateKey, MutationBackupBotPrivateKeyRequest>;

export const mutationBackupBotPrivateKey = async ({
    mutation = MutationBackupBotPrivateKey.Mutation1,
    token,
    headers,
    request,
}: MutationBackupBotPrivateKeyParams) => {
    if (!token) {
        throw new Error("Token is required")
    }
    if (!headers) {
        throw new Error("Headers are required")
    }
    if (!request) {
        throw new Error("Request is required")
    }
    const mutationDocument = mutationMap[mutation]
    // use no cache credential to include http only cookies
    return await createNoCacheCredentialAuthClientWithTokenAndHeaders(token, headers).mutate<{
        backupBotPrivateKey: GraphQLResponse<MutationBackupBotPrivateKeyResponse>,
    }>({
        mutation: mutationDocument,
        variables: {
            request
        },
    })
}
