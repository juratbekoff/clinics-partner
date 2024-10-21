export type ReviewType = {
    id: number,
    userId: number,
    clinicId: number,
    content: string,
    reply: string,
    rating: 1 | 2 | 3 | 4 | 5,
    createdAt: string
    updatedAt: string
    user: {
        id: number,
        name: string,
    }
}

export type ReviewRatingType = {
    stars: number,
    count: number,
    percent: number
}

export type GetReviewsType = {
    stats: {
        average: number,
        byStars: ReviewRatingType[]
    },
    reviews: ReviewType[]
}