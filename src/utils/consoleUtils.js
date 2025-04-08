export const log = (...args) => {
	const resultArr = args.map((arg) => {
		try {
			return typeof arg === 'object'
				? JSON.stringify(
						arg,
						(key, val) => {
							if (typeof val === 'function') {
								return val.toString();
							}
							return val;
						},
						2
					)
				: String(arg);
		} catch (e) {
			return '[Circular]';
		}
	});
};
