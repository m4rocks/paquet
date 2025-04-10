interface PagefindSearchResultData {
	url: string,
	meta: {
		id: string,
		title: string,
	}
}

interface PagefindSearch {
	results: {
		id: string,
		data: () => Promise<PagefindSearchResultData>
	}[]
}

interface Pagefind {
	init: () => void,
	/// Needs further implementation
	options: () => Promise<void>
	search: (str: string) => Promise<PagefindSearch>
	debouncedSearch: (str: string, {}, timeout: number) => Promise<PagefindSearch>
}