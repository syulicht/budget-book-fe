import { UserManager } from 'oidc-client-ts'

import { cognitoAuthSettings } from './config'

export const userManager = new UserManager(cognitoAuthSettings)
