import { getAPI, putAPI, postAPI, deleteAPI } from '.'

export function newCacheRule({ regexp, enabled }) {
    return postAPI({ uri: "/v1/plugins/cache/rule", params: { regexp, enabled } })
}

export function delCacheRule({ idx }) {
    return deleteAPI({ uri: "/v1/plugins/cache/rules/" + idx, params: null })
}

export function getCacheRules({ limit = 10, offset = 0 }) {
    return getAPI({ uri: "/v1/plugins/cache/rules", params: { offset, limit } })
}

export function editCacheRule({ idx, regexp, enabled }) {
    return putAPI({ uri: "/v1/plugins/cache/rules/" + idx, params: { regexp, enabled } })
}