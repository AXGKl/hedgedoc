/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { GetApiRequestBuilder } from '../common/api-request-builder/get-api-request-builder'
import type { Config } from './types'

/**
 * Fetches the frontend config from the backend.
 *
 * @return The frontend config.
 * @throws {Error} when the api request wasn't successful.
 */
export const getConfig = async (): Promise<Config> => {
  const response = await new GetApiRequestBuilder<Config>('config', 'config').sendRequest()
  return response.asParsedJsonObject()
}
