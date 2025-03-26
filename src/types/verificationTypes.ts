interface VerificationTuple {
    id: number,
    email: string,
    code: string,
    createdAt: Date,
    updatedAt: Date,
}

interface VerificationEmailHTTPResponse {
    message: string;
}

interface VerifyEmailDto extends Pick<VerificationTuple, "email"> {}

interface VerifyCodeDto extends Pick<VerificationTuple, "email" | "code"> {}

export type { VerificationTuple, VerifyEmailDto, VerifyCodeDto, VerificationEmailHTTPResponse }