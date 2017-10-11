const get = require('lodash.get');
const flatten = require('lodash.flattendeep');
const t = require('babel-types');

// Counts the number of arguments to console.log that are variables.
const countIdentifiersVisitor = {
	Identifier: function (path, args) {
		const name = path.node.name;

		if (name !== 'console' && name !== 'log') {
			args.state.identifierCount++;
		}
	}
};

const aggregateMemberNames = node => {
	if (t.isThisExpression(node)) return 'this';
	if (t.isIdentifier(node)) return node.name;

	if (t.isMemberExpression(node)) {
		const propertyName = node.property.name;

		return [ aggregateMemberNames(node.object), propertyName ];
	}
}

const transformer = function (babel) {
	return {
		visitor: {
			CallExpression: (path) => {
				const obj = get(path, 'node.callee.object.name');
				const prop = get(path, 'node.callee.property.name')

				if (obj === 'console' && prop === 'log') {
					const args = path.node.arguments;
					const argCount = args.length;

					let state = {
						identifierCount: 0
					};

					path.traverse(
						countIdentifiersVisitor,
						{ state }
					);

					const validArgs = args.filter(node => {
						return t.isMemberExpression(node) || t.isIdentifier(node);
					});

					if (validArgs.length === argCount) {
						const names = args.map(node => {
							if (t.isIdentifier(node)) {
								return node.name;
							}

							if (node.type === 'MemberExpression') {
								const namesArray = flatten(aggregateMemberNames(node));
								return namesArray.join('.');
							}
						});

						const concated = `${names.join(', ')}: `;
						path.node.arguments.unshift(t.stringLiteral(concated));
					}
				}
			}
		}
	}

}

module.exports = transformer;
