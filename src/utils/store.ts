import vegemite from 'vegemite'

interface EventMap {
	'theme:change': undefined
}

const store = vegemite<EventMap, Record<string, unknown>>()

export default store
