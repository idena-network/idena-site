import {initializeClock} from './countdown'

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
