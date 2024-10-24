export type SubscriptionType = "FREE" | "START" | "FULL"

export type PartnerType = {
    id?: number,
    name?: string,
    username?: string,
    password?: string,
    subscription?: SubscriptionType
    createdAt?: Date,
    updatedAt?: Date,
}

export type LoginPartnerType = {
    username: string,
    password: string
}