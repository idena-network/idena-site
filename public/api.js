import axios from 'axios'
import {initializeClock} from './countdown'

const BASE_API_URL = 'https://api.idena.org/api'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

function apiCoingecko() {
  return axios.create({
    baseURL: COINGECKO_API_URL,
  })
}

function apiClient() {
  return axios.create({
    baseURL: BASE_API_URL,
  })
}

async function getResponse(request) {
  const {data} = await request
  const {result, continuationToken, error} = data
  if (error) throw error
  if (continuationToken) result.continuationToken = continuationToken
  return result
}

export async function useTotalValidatedCount() {
  const response = await fetch('https://api.idena.io/api/epoch/last')
  const jsonEpoch = await response.json()
  const epochNumber = jsonEpoch.result.epoch

  const identityData = await fetch(
    `https://api.idena.io/api/Epoch/${epochNumber}/IdentityStatesInterimSummary`
  )
  const jsonIdentity = await identityData.json()
  if (jsonIdentity.result == null) {
    return
  }

  let valid = 0
  for (let i = 0; i < jsonIdentity.result.length; i++) {
    const state = jsonIdentity.result[i].value
    valid +=
      state === 'Newbie' || state === 'Verified' || state === 'Human'
        ? jsonIdentity.result[i].count
        : 0
  }

  return valid
}

export async function useNextValidationTime() {
  const response = await fetch('https://api.idena.io/api/epoch/last')
  const jsonEpoch = await response.json()
  if (jsonEpoch.result == null) {
    return
  }

  const nextValidationTime = new Date(jsonEpoch.result.validationTime)
  const nowDate = new Date()
  const diff = Math.ceil(nextValidationTime.getTime() - nowDate.getTime())
  initializeClock('counter', nextValidationTime)

  return diff < 0
    ? 'RUNNING NOW'
    : new Date(nextValidationTime).toLocaleString()
}

export async function useLatestGithubReleaseDownload() {
  const clientResponse = await fetch(
    'https://api.github.com/repos/idena-network/idena-desktop/releases/latest'
  )
  const clientJson = await clientResponse.json()
  const clientVersion = clientJson.tag_name

  const nodeResponse = await fetch(
    'https://api.github.com/repos/idena-network/idena-go/releases/latest'
  )
  const nodeJson = await nodeResponse.json()
  const nodeVersion = nodeJson.tag_name

  const response = {}
  response.clientVersion = clientVersion.substr(1, clientVersion.length - 1)
  response.clientAssets = clientJson.assets
  response.nodeVersion = nodeVersion.substr(1, nodeVersion.length - 1)
  response.nodeAssets = nodeJson.assets

  return response
}

export async function getOnlineIdentitiesCount() {
  return getResponse(apiClient().get('onlineidentities/count'))
}

export async function getCoingeckoData() {
  const params = {
    ids: 'idena',
    vs_currencies: 'usd',
    include_market_cap: true,
    include_24hr_vol: true,
    include_24hr_change: true,
    include_last_updated_at: true,
  }

  const request = apiCoingecko().get('/simple/price', {params})
  const {data} = await request
  return data
}

export async function getOnlineMinersCount() {
  return getResponse(apiClient().get('onlineminers/count'))
}

export async function getEpochRewardsSummary(epoch) {
  return getResponse(apiClient().get(`epoch/${epoch}/rewardsSummary`))
}

export async function getLastEpoch() {
  return getResponse(apiClient().get('epoch/last'))
}

export async function getEpoch(epoch) {
  return getResponse(apiClient().get(`epoch/${epoch}`))
}

export async function getEpochIdentitiesSummary(epoch) {
  return getResponse(apiClient().get(`epoch/${epoch}/identityStatesSummary`))
}

export async function getEpochRewardBounds(epoch) {
  return getResponse(apiClient().get(`epoch/${epoch}/rewardBounds`))
}
