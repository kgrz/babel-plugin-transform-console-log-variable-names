const transformer = function (babel) {
	return {
		visitor: {
			Identifier: function (path, state) {
				if (path.node.name === 'log') {
					if (path.parent.object.name === 'console') {
						const args = path.parentPath.parentPath.node.arguments;
						console.log(args);
					}
				}
			}
		}
	}

}

module.exports = transformer;
