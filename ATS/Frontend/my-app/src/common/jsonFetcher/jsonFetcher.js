

export default function jsonFetcher(url, params = {}) {
	return fetch(url, {
		...params,
		...((params.method && params.method.toLowerCase() === "post")
			&& { headers: { ...params.headers, "Content-Type": "application/json" } }),
		...(params.body && { body: JSON.stringify(params.body) })
	}).then(r => {
		return r.json()
			.then(data => {
				if (!r.ok) {
					throw new Error(data.message)
				}
				return data;
			})

	})
}