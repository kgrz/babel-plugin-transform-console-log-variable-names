const get = require('lodash.get');
const t = require('babel-types');

let state = 0;

// Counts the number of arguments to console.log that are variables.
const countLabelArgumentsVisitor = {
	Identifier: function (path, args) {
		const name = path.node.name;

		if (name !== 'console' && name !== 'log') {
			args.items.push(path.node.name);
		}
	}
};

const transformer = function (babel) {
	return {
		visitor: {
			CallExpression: (path) => {
				const obj = get(path, 'node.callee.object.name');
				const prop = get(path, 'node.callee.property.name')

				if (obj === 'console' && prop === 'log') {
					const argCount = path.node.arguments.length;
					const items = [];
					path.traverse(countLabelArgumentsVisitor, { items })
					if (items.length === argCount) {
						const names = path.node.arguments.map(node => node.name);
						const concated = `${names.join(', ')}: `;
						path.node.arguments.unshift(t.stringLiteral(concated));
					}
				}
			}
		}
	}

}

module.exports = transformer;
