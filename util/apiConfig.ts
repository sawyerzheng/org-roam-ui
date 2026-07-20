export interface OrgRoamUiConfig {
  wsUrl?: string
  apiUrl?: string
}

function getGlobalConfig(): OrgRoamUiConfig | null {
  if (typeof window === 'undefined') return null
  return (window as any).__ORG_ROAM_UI_CONFIG__ ?? null
}

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return true
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
}

export function getWsUrl(): string {
  const config = getGlobalConfig()
  if (config?.wsUrl) return config.wsUrl

  if (typeof window === 'undefined') return 'ws://localhost:35903'

  if (isLocalhost()) {
    return 'ws://localhost:35903'
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${window.location.host}/ws`
}

export function getApiBaseUrl(): string {
  const config = getGlobalConfig()
  if (config?.apiUrl) return config.apiUrl

  if (typeof window === 'undefined') return 'http://localhost:35901'

  if (isLocalhost()) {
    return 'http://localhost:35901'
  }

  return window.location.origin
}
