import { getAPI, putAPI, postAPI, deleteAPI } from '.'

// reverse server config api functions

export function getClusters() {
    return getAPI({ uri: "/v1/clusters", params: null })
}

export function getClusterInfo({ clusterID }) {
    return getAPI({
        uri: "/v1/clusters/" + clusterID,
        params: null
    })
}

export function newCluster({ name, instances }) {
    return postAPI({
        uri: "/v1/cluster",
        params: { name, instances },
        headers: { "Content-Type": "application/json" }
    })
}

export function updateCluster({ clusterID, name }) {
    return putAPI({
        uri: "/v1/clusters/" + clusterID,
        params: { name }
    })
}

export function delCluster({ clusterID }) {
    return deleteAPI({
        uri: "/v1/clusters/" + clusterID,
        params: null
    })
}

export function newClusterInstance({ cluster_id, name, addr, weight, need_check_health, health_check_url = "" }) {
    return postAPI({
        uri: "/v1/clusters/" + cluster_id + "/instance",
        params: { name, addr, weight, need_check_health, health_check_url },
    })
}

export function getClusterInstance({ clusterID, instanceID }) {
    return getAPI({
        uri: "/v1/clusters/" + clusterID + "/instance/" + instanceID,
        params: null,
    })
}

export function delClusterInstance({ clusterID, instanceID }) {
    return deleteAPI({
        uri: "/v1/clusters/" + clusterID + "/instance/" + instanceID,
        params: null
    })
}

export function updateClusterInstance({ idx, cluster_id, name, addr, weight, need_check_health, health_check_url = "" }) {
    return putAPI({
        uri: "/v1/clusters/" + cluster_id + "/instance/" + idx,
        params: { name, addr, weight, need_check_health, health_check_url }
    })
}

// server rules config api functions

export function getRoutings({ limit, offset }) {
    return getAPI({
        uri: "/v1/routings",
        params: { limit, offset }
    })
}

export function newRouting({ prefix, target_cluster_id, need_strip_prefix }) {
    return postAPI({
        uri: "/v1/routings/routing",
        params: { prefix, target_cluster_id, need_strip_prefix }
    })
}

export function editRouting({ id, prefix, target_cluster_id, need_strip_prefix }) {
    return putAPI({
        uri: "/v1/routings/" + id,
        params: { prefix, target_cluster_id, need_strip_prefix }
    })
}

export function delRouting({ id }) {
    return deleteAPI({
        uri: "/v1/routings/" + id,
        params: null
    })
}

// path rules config api functions

export function getAPIs({ limit, offset }) {
    return getAPI({
        uri: "/v1/apis",
        params: { limit, offset }
    })
}

export function getAPInfo({ apiID }) {
    return getAPI({
        uri: "/v1/apis/" + apiID,
        params: null
    })
}

export function delAPI({ id }) {
    return deleteAPI({
        uri: "/v1/apis/" + id,
        params: null
    })
}

export function editAPI({ idx, path, rewrite_path, method, target_cluster_id, combinations, need_combine }) {
    return putAPI({
        uri: "/v1/apis/" + idx,
        params: { path, rewrite_path, method, target_cluster_id, combinations, need_combine },
        headers: { "Content-Type": "application/json" }
    })
}

export function newAPI({ path, rewrite_path, method, target_cluster_id, combinations, need_combine }) {
    return postAPI({
        uri: "/v1/apis/api",
        params: { path, rewrite_path, method, target_cluster_id, combinations, need_combine },
        headers: { "Content-Type": "application/json" }
    })
}