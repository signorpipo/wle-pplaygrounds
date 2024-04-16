// #region Service Worker Setup

let _myAppName = "wle-pplayground";
let _myServiceWorkerVersion = 1;
let _myCacheVersion = 1;



let _myResourceURLsToPrecache = [
    "/",
    "index.html",
    "favicon.ico",
    "manifest.json",
    "icon48.png",
    "icon72.png",
    "icon96.png",
    "icon144.png",
    "icon168.png",
    "icon192.png",
    "icon512.png",
    _myAppName + "-bundle.js",
    "WonderlandRuntime-LoadingScreen.bin",
    //"WonderlandRuntime-physx.wasm",
    //"WonderlandRuntime-physx.js",
    //"WonderlandRuntime-physx-simd.wasm",
    //"WonderlandRuntime-physx-simd.js",
    //"WonderlandRuntime-physx-threads.wasm",
    //"WonderlandRuntime-physx-threads.js",
    //"WonderlandRuntime-physx-threads.worker.js",
    //"WonderlandRuntime-physx-simd-threads.wasm",
    //"WonderlandRuntime-physx-simd-threads.js",
    //"WonderlandRuntime-physx-simd-threads.worker.js",
    _myAppName + ".bin",
    _myAppName + "-textures.bin"
];



// If u are not sure if it is a good idea to cache resources which are not coming from your own location,
// which basically means the ones uploaded by u on your domain,
// u can enable this to cache only the ones coming from the current location
let _myPutInCacheOnlyResourcesFromCurrentLocation = true;

// Try the cache first, and only if it fails fetch from the network
// The URL params are ignored as a fallback for the index URL 
let _myTryFetchFromCacheFirst = false;

// When fetching from the cache first, the resource is never updated again
// If u want to fetch from the cache to quickly serve the request, but still want to update the cached resource by fetching from the network,
// u can enable this
let _myUpdateCacheInBackground = false;

// Ignore URL params when trying to fetch from the cache, but only if the network fails,
// since the params might be used to fetch a different resource
let _myFetchFromCacheIgnoringURLParamsForResourcesFromCurrentLocationAsFallback = true;

// Ignore browser cache when fetching from the network
let _myFetchFromNetworkIgnoringBrowserCacheForResourcesFromCurrentLocation = true;

// If u are not using @_myTryFetchFromCacheFirst, when the network fails for the current location it will take a lot to fetch the requests from the cache,
// since every request needs to fail first
// U can enable this to make it so that on the first network error from the current location u switch to use the cache first
let _myForceTryFetchFromCacheFirstOnNetworkErrorFromCurrentLocation = false;



// This will avoid installing the service worker on localhost,
// since it might be annoying while developing your app
let _myRejectServiceWorkerOnLocalhost = true;



let _myLogEnabled = false;

// #endregion Service Worker Setup






// #region Service Worker Constants

let _EVERY_RESOURCE = [".*"];
let _NO_RESOURCE = [];

let _EVERY_RESOURCE_FROM_CURRENT_LOCATION = ["^" + _escapeRegexSpecialCharacters(_getCurrentLocation()) + ".*"];
let _EVERY_RESOURCE_FROM_CURRENT_ORIGIN = ["^" + _escapeRegexSpecialCharacters(_getCurrentOrigin()) + ".*"];

let _EVERY_LOCATION = [".*"];
let _NO_LOCATION = [];
let _LOCALHOST = ["localhost:\\d\\d\\d\\d", "127\\.0\\.0\\.1:\\d\\d\\d\\d"];

let _IGNORE_INDEX_URL_PARAMS = [
    "^" + _escapeRegexSpecialCharacters(_getCurrentLocation()) + "$",
    "^" + _escapeRegexSpecialCharacters(_getCurrentLocation()) + "\\?",
    "^" + _escapeRegexSpecialCharacters(_getCurrentLocation()) + "index\\.html"
];

// #endregion Service Worker Constants



// #region Service Worker Variables

let _myForceTryFetchFromCacheFirstOnNetworkErrorEnabled = false; // This is reset only when all the tabs are closed, reloading them is not enough

// #endregion Service Worker Variables



// #region Service Worker Events

self.addEventListener("install", function (event) {
    event.waitUntil(_install());
});

self.addEventListener("activate", function (event) {
    event.waitUntil(_activate());
});

self.addEventListener("fetch", function (event) {
    event.respondWith(_fetchFromServiceWorker(event.request));
});

// #endregion Service Worker Events



// #region Service Worker Functions

async function _install() {
    if (_myRejectServiceWorkerOnLocalhost) {
        let rejectServiceWorker = _shouldResourceURLBeIncluded(_getCurrentLocation(), _LOCALHOST, _NO_LOCATION);
        if (rejectServiceWorker) {
            throw new Error("The service worker is not allowed to be installed on the current location: " + _getCurrentLocation(false));
        }
    }

    await _cacheResourcesToPrecache();
}

async function _activate() {
    await _copyTempCacheToCurrentCache();

    await _deletePreviousCaches();
}

async function _fetchFromServiceWorker(request) {
    try {
        if (!_shouldHandleRequest(request)) {
            return fetch(request);
        }

        let cacheAlreadyTried = false;
        if (_myTryFetchFromCacheFirst || _myForceTryFetchFromCacheFirstOnNetworkErrorEnabled) {
            cacheAlreadyTried = true;

            let responseFromCache = await _fetchFromCache(request);

            if (responseFromCache == null) {
                let ignoreURLParamsAsFallback = _shouldResourceURLBeIncluded(request.url, _IGNORE_INDEX_URL_PARAMS, _NO_RESOURCE);
                if (ignoreURLParamsAsFallback) {
                    responseFromCache = await _fetchFromCache(request, ignoreURLParamsAsFallback);
                    if (responseFromCache != null) {
                        if (_myLogEnabled) {
                            console.warn("Try fetch from cache first using a fallback: " + request.url);
                        }
                    }
                }
            }

            if (responseFromCache != null) {
                if (_myUpdateCacheInBackground) {
                    _fetchFromNetworkAndPutInCache(request);
                }

                return responseFromCache;
            }
        }

        let [responseFromNetwork, responseHasBeenCached] = await _fetchFromNetworkAndPutInCache(request, true);
        if (_isResponseOk(responseFromNetwork) || _isResponseOpaque(responseFromNetwork)) {
            return responseFromNetwork;
        } else {
            if (!_myForceTryFetchFromCacheFirstOnNetworkErrorEnabled) {
                let enableForceTryFetchFromCacheFirstOnNetworkError = _myForceTryFetchFromCacheFirstOnNetworkErrorFromCurrentLocation && _shouldResourceURLBeIncluded(request.url, _EVERY_RESOURCE_FROM_CURRENT_LOCATION, _NO_RESOURCE);
                if (enableForceTryFetchFromCacheFirstOnNetworkError) {
                    _myForceTryFetchFromCacheFirstOnNetworkErrorEnabled = true;

                    if (_myLogEnabled) {
                        console.warn("Force try cache on network error enabled");
                    }
                }
            }

            if (!cacheAlreadyTried) {
                let responseFromCache = await _fetchFromCache(request);
                if (responseFromCache != null) {
                    return responseFromCache;
                }
            }

            let ignoreURLParamsAsFallback = _myFetchFromCacheIgnoringURLParamsForResourcesFromCurrentLocationAsFallback && _shouldResourceURLBeIncluded(request.url, _EVERY_RESOURCE_FROM_CURRENT_LOCATION, _NO_RESOURCE);
            if (ignoreURLParamsAsFallback) {
                let fallbackResponseFromCache = await _fetchFromCache(request, ignoreURLParamsAsFallback);
                if (fallbackResponseFromCache != null) {
                    if (_myLogEnabled) {
                        console.warn("Fetch from cache using a fallback: " + request.url);
                    }

                    return fallbackResponseFromCache;
                }
            }

            // If everything else fail, return the response from the network
            return responseFromNetwork;
        }
    } catch (error) {
        let errorMessage = "An error occurred while trying to fetch from the service worker: " + request?.url;
        let responseFromServiceWorker = new Response(errorMessage + "\n\n" + error, {
            status: 500,
            headers: { "Content-Type": "text/plain" }
        });

        try {
            if (_myLogEnabled) {
                console.error(errorMessage);
                console.error(error);
            }
        } catch (anotherError) {
            // Do nothing
        }

        return responseFromServiceWorker;
    }
}

async function _fetchFromNetworkAndPutInCache(request, awaitOnlyFetchFromNetwork = false, useTempCache = false) {
    let responseFromNetwork = await _fetchFromNetwork(request);

    let responseHasBeenCached = false;
    if (awaitOnlyFetchFromNetwork) {
        _postFetchFromNetwork(request, responseFromNetwork, useTempCache);
        responseHasBeenCached = null; // Not awaiting, which means we can't know if the resource will be actually cached
    } else {
        responseHasBeenCached = await _postFetchFromNetwork(request, responseFromNetwork, useTempCache);
    }

    return [responseFromNetwork, responseHasBeenCached];
}

async function _fetchFromNetwork(request) {
    let responseFromNetwork = null;

    try {
        let fetchFromNetworkIgnoringBrowserCache = _myFetchFromNetworkIgnoringBrowserCacheForResourcesFromCurrentLocation && _shouldResourceURLBeIncluded(request.url, _EVERY_RESOURCE_FROM_CURRENT_LOCATION, _NO_RESOURCE);
        if (fetchFromNetworkIgnoringBrowserCache) {
            if (request.cache != "no-cache" && request.cache != "no-store" && request.cache != "reload") {
                let requestIgnoringBrowserCache = new Request(request, { cache: "no-cache" });
                responseFromNetwork = await fetch(requestIgnoringBrowserCache);
            } else {
                responseFromNetwork = await fetch(request);
            }
        } else {
            responseFromNetwork = await fetch(request);
        }
    } catch (error) {
        let errorMessage = "An error occurred while trying to fetch from the network: " + request.url;
        responseFromNetwork = new Response(errorMessage + "\n\n" + error, {
            status: 500,
            headers: { "Content-Type": "text/plain" }
        });

        if (_myLogEnabled) {
            console.error(errorMessage);
            console.error(error);
        }
    }

    return responseFromNetwork;
}

async function _postFetchFromNetwork(request, responseFromNetwork, useTempCache = false) {
    let responseHasBeenCached = false;

    if (_shouldResourceBeCached(request, responseFromNetwork)) {
        responseHasBeenCached = await _putInCache(request, responseFromNetwork, useTempCache);
    } else if (_shouldDeleteFromCacheDueToOpaqueResponse(request, responseFromNetwork)) {
        let ignoreURLParamsAsFallback = _myFetchFromCacheIgnoringURLParamsForResourcesFromCurrentLocationAsFallback && _shouldResourceURLBeIncluded(request.url, _EVERY_RESOURCE_FROM_CURRENT_LOCATION, _NO_RESOURCE);
        await _deleteFromCache(request, ignoreURLParamsAsFallback);
    }

    return responseHasBeenCached;
}

async function _fetchFromCache(request, ignoreURLParams = false) {
    let responseFromCache = null;

    try {
        let currentCacheID = _getCacheID();
        let hasCache = await caches.has(currentCacheID); // Avoid creating the cache when opening it if it has not already been created
        if (hasCache) {
            let currentCache = await caches.open(currentCacheID);
            responseFromCache = await currentCache.match(request, { ignoreSearch: ignoreURLParams });
        }
    } catch (error) {
        responseFromCache = null;

        if (_myLogEnabled) {
            console.error("An error occurred while trying to get from the cache: " + request.url);
            console.error(error);
        }
    }

    return responseFromCache;
}

async function _putInCache(request, response, useTempCache = false) {
    let putInCacheSucceeded = false;

    try {
        let clonedResponse = response.clone();
        let currentCacheID = (useTempCache) ? _getTempCacheID() : _getCacheID();
        let currentCache = await caches.open(currentCacheID);
        await currentCache.put(request, clonedResponse);
        putInCacheSucceeded = true;
    } catch (error) {
        putInCacheSucceeded = false;

        if (_myLogEnabled) {
            console.error("An error occurred while trying to put the response in the cache: " + request.url);
            console.error(error);
        }
    }

    return putInCacheSucceeded;
}

async function _deleteFromCache(request, ignoreURLParams = false, useTempCache = false) {
    let deleteFromCacheSucceeded = false;

    try {
        let currentCacheID = (useTempCache) ? _getTempCacheID() : _getCacheID();
        let currentCache = await caches.open(currentCacheID);
        deleteFromCacheSucceeded = await currentCache.delete(request, { ignoreSearch: ignoreURLParams });
    } catch (error) {
        deleteFromCacheSucceeded = false;

        if (_myLogEnabled) {
            console.error("An error occurred while trying to delete the resource from the cache: " + request.url);
            console.error(error);
        }
    }

    return deleteFromCacheSucceeded;
}

async function _cacheResourcesToPrecache() {
    if (_getResourceURLsToPrecache().length == 0) return;

    let currentCache = null;

    try {
        let cacheAlreadyExists = await caches.has(_getCacheID());
        if (cacheAlreadyExists) {
            currentCache = await caches.open(_getCacheID());
        }
    } catch (error) {
        currentCache = null;
    }

    let currentTempCache = null;
    try {
        let tempCacheAlreadyExists = await caches.has(_getTempCacheID());
        if (tempCacheAlreadyExists) {
            currentTempCache = await caches.open(_getTempCacheID());
        }
    } catch (error) {
        currentTempCache = null;
    }

    let precacheResourceAsyncCallback = async function precacheResourceAsyncCallback(resourceFullURLToPrecache) {
        let resourceHasBeenPrecached = false;

        try {
            let resourceHaveToBeCached = false;

            let resourceAlreadyInCache = false;
            if (currentCache != null) {
                resourceAlreadyInCache = await currentCache.match(resourceFullURLToPrecache, { ignoreVary: true }) != null;
            }

            if (!resourceAlreadyInCache) {
                let resourceAlreadyInTempCache = false;
                if (currentTempCache != null) {
                    resourceAlreadyInTempCache = await currentTempCache.match(resourceFullURLToPrecache, { ignoreVary: true }) != null;
                }

                if (!resourceAlreadyInTempCache) {
                    resourceHaveToBeCached = true;
                }
            }

            if (resourceHaveToBeCached) {
                let [responseFromNetwork, responseHasBeenCached] = await _fetchFromNetworkAndPutInCache(new Request(resourceFullURLToPrecache), false, true);
                resourceHasBeenPrecached = responseHasBeenCached != null && responseHasBeenCached;
            } else {
                resourceHasBeenPrecached = true; // The resource has been already precached
            }
        } catch (error) {
            resourceHasBeenPrecached = false;

            if (_myLogEnabled) {
                console.error("Failed to fetch the resource to precache: " + resourceFullURLToPrecache);
                console.error(error);
            }
        }
    };

    let promisesToAwait = [];
    for (let resourceURLToPrecache of _getResourceURLsToPrecache()) {
        let resourceFullURLToPrecache = new Request(resourceURLToPrecache).url;

        promisesToAwait.push(precacheResourceAsyncCallback(resourceFullURLToPrecache));
    }

    await Promise.all(promisesToAwait);
}

async function _copyTempCacheToCurrentCache() {
    let currentTempCacheID = _getTempCacheID();

    try {
        let hasTempCache = await caches.has(currentTempCacheID);
        if (hasTempCache) {
            let currentTempCache = await caches.open(currentTempCacheID);
            let currentCache = await caches.open(_getCacheID());

            let currentTempCachedResourceRequests = await currentTempCache.keys();
            for (let currentTempCachedResourceRequest of currentTempCachedResourceRequests) {
                try {
                    let currentTempCachedResource = await currentTempCache.match(currentTempCachedResourceRequest);
                    await currentCache.put(currentTempCachedResourceRequest, currentTempCachedResource);
                } catch (error) {
                    // Do nothing
                }
            }
        }
    } catch (error) {
        // Do nothing
    }

    try {
        let cachesIDs = await caches.keys();
        for (let cacheID of cachesIDs) {
            try {
                if (_shouldDeleteTempCacheID(cacheID)) {
                    await caches.delete(cacheID);
                }
            } catch (error) {
                // Do nothing
            }
        }
    } catch (error) {
        // Do nothing
    }
}

async function _deletePreviousCaches() {
    try {
        let cachesIDs = await caches.keys();

        for (let cacheID of cachesIDs) {
            try {
                if (_shouldDeleteCacheID(cacheID)) {
                    await caches.delete(cacheID);
                }
            } catch (error) {
                // Do nothing
            }
        }
    } catch (error) {
        // Do nothing
    }
}

function _getResourceURLsToPrecache() {
    return _myResourceURLsToPrecache;
}

// #endregion Service Worker Functions



// #region Service Worker Utils

function _isResponseOk(response) {
    return response != null && response.status == 200;
}

function _isResponseOpaque(response) {
    return response != null && response.status == 0 && response.type != null && response.type.includes("opaque");
}

function _shouldResourceBeCached(request, response) {
    let cacheResource = !_myPutInCacheOnlyResourcesFromCurrentLocation || _shouldResourceURLBeIncluded(request.url, _EVERY_RESOURCE_FROM_CURRENT_LOCATION, _NO_RESOURCE);
    return cacheResource && request.method == "GET" && _isResponseOk(response);
}

function _shouldDeleteFromCacheDueToOpaqueResponse(request, response) {
    let cacheResource = !_myPutInCacheOnlyResourcesFromCurrentLocation || _shouldResourceURLBeIncluded(request.url, _EVERY_RESOURCE_FROM_CURRENT_LOCATION, _NO_RESOURCE);
    return cacheResource && request.method == "GET" && !_isResponseOk(response) && _isResponseOpaque(response);
}

function _shouldHandleRequest(request) {
    return request != null && request.url != null && request.method != null && request.method == "GET";
}

function _getCacheID(cacheVersion = _myCacheVersion) {
    return _myAppName + "_cache_v" + cacheVersion.toFixed(0);
}

function _getTempCacheID(cacheVersion = _myCacheVersion, serviceWorkerVersion = _myServiceWorkerVersion) {
    return _getCacheID(cacheVersion) + "_temp_v" + serviceWorkerVersion.toFixed(0);
}

function _isCacheID(cacheID) {
    let matchCacheID = new RegExp("^" + _escapeRegexSpecialCharacters(_myAppName) + "_cache_v\\d+$");
    return cacheID.match(matchCacheID) != null;
}

function _isTempCacheID(tempCacheID) {
    let matchTempCacheID = new RegExp("^" + _escapeRegexSpecialCharacters(_myAppName) + "_cache_v\\d+_temp_v\\d+$");
    return tempCacheID.match(matchTempCacheID) != null;
}

function _shouldDeleteCacheID(cacheID) {
    let deleteCacheID = false;

    let validCacheID = _isCacheID(cacheID);
    if (validCacheID) {
        let cacheIDWithoutAppName = cacheID.replace(new RegExp("^" + _escapeRegexSpecialCharacters(_myAppName)), "");

        let versions = Array.from(cacheIDWithoutAppName.matchAll(new RegExp("_v(\\d+)(?:_|$)", "g")), match => match[1]);

        deleteCacheID = parseInt(versions[0]) < _myCacheVersion;
    }

    return deleteCacheID;
}

function _shouldDeleteTempCacheID(tempCacheID) {
    let deleteTempCacheID = false;

    let validTempCacheID = _isTempCacheID(tempCacheID);
    if (validTempCacheID) {
        let tempCacheIDWithoutAppName = tempCacheID.replace(new RegExp("^" + _escapeRegexSpecialCharacters(_myAppName)), "");

        let versions = Array.from(tempCacheIDWithoutAppName.matchAll(new RegExp("_v(\\d+)(?:_|$)", "g")), match => match[1]);

        deleteTempCacheID =
            parseInt(versions[0]) < _myCacheVersion ||
            (parseInt(versions[0]) == _myCacheVersion && parseInt(versions[1]) <= _myServiceWorkerVersion);
    }

    return deleteTempCacheID;
}

// #endregion Service Worker Utils



// #region Cauldron Utils

function _shouldResourceURLBeIncluded(resourceURL, includeList, excludeList) {
    let includeResourseURL = false;
    for (let includeURL of includeList) {
        if (resourceURL.match(includeURL) != null) {
            includeResourseURL = true;
            break;
        }
    }

    if (includeResourseURL) {
        for (let excludeURL of excludeList) {
            if (resourceURL.match(excludeURL) != null) {
                includeResourseURL = false;
                break;
            }
        }
    }

    return includeResourseURL;
}

function _getCurrentLocation(addTrailingSlash = true) {
    return self.location.href.slice(0, self.location.href.lastIndexOf("/")) + (addTrailingSlash ? "/" : "");
}

function _getCurrentOrigin(addTrailingSlash = true) {
    return self.location.origin + (addTrailingSlash ? "/" : "");
}

function _escapeRegexSpecialCharacters(regexToEscape) {
    let escapeSpecialCharacters = new RegExp("[/\\-\\\\^$*+?.()|[\\]{}]", "g");
    return regexToEscape.replace(escapeSpecialCharacters, "\\$&");
}

// #endregion Cauldron Utils