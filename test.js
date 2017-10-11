const babel = require('babel-core');
const plugin = require('./index');
const classPropertyTransformer = require('babel-plugin-transform-class-properties');

it('adds variable name as label to console.log argument', () => {
	const example = `
		const a = 'wut';
		console.log(a);
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
});

it('adds correct label when printing out instance properties', () => {
	const example = `
		this.a = 'wut';
		console.log(this.a);
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
	
});

it('adds label when printing out functions', () => {
	const example = `
		function a () { console.log('hi'); };
		console.log(a);
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
	
});

it('adds concatenated variable name as label to console.log argument', () => {
	const example = `
		const a = 'wut';
		const b = 'wut again';
		const c = 'wut once again';
		console.log(a, b, c);
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
});

it('does not add label if variables are not used', () => {
	const example = `
		console.log('wut');
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
});

it('works when printing variables pointing to objects', () => {
	const example = `
		const wut = { a: 1 };
		console.log(wut);
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
});

it('works when printing variables pointing to functions', () => {
	const example = `
		const wut = function () {
			console.log('hi');
		}
		console.log(wut);
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
});


it('works inside class methods', () => {
	const example = `
	class A {
		componentWillReceiveProps (nextProps) {
			console.log(this.props);
			console.log(nextProps);
		}
	}
	`;

	const code = babel.transform(example, { plugins: [plugin] }).code;
	expect(code).toMatchSnapshot();
});

