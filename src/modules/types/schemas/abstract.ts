export interface AbstractSchema {
    /** The unique ID of the object (MongoDB _id) */
    id: string

    /** The date the object was created */
    createdAt: string

    /** The date the object was last updated */
    updatedAt: string

    /** Optional expiration date (if TTL is applied) */
    expiredAt?: string
}