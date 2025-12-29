import type { User, IdTokenClaims } from "oidc-client-ts";

// CognitoのIdTokenClaimsを拡張
export interface CognitoIdTokenClaims extends IdTokenClaims {
  "cognito:username": string;
}

// Cognito用のUser型
export interface CognitoUser extends Omit<User, "profile"> {
  profile: CognitoIdTokenClaims;
}
