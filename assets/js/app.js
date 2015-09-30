'use strict';

var languages = [{ name: 'js', value: 'Javascript', method: "moment().format('%%')" }, { name: 'php', value: 'PHP', method: "date('%%')" }];

// 	{ name: 'ruby', value: 'Ruby'},
// 	{ name: 'python', value: 'Python' }
window.App = {};

App.events = {
	codeUpdated: new signals.Signal(),
	languageUpdated: new signals.Signal(),
	insertChar: new signals.Signal(),
	ga: new signals.Signal()
};

App.code = {};
App.preview = [];
App.jsFormat = [];
App.activeLanguage = 'js';

App.boot = function () {
	App.keyboard();
	App.ga();
};

App.ga = function () {

	var getEvent = function getEvent(action, item) {
		console.log('--ga--');
		console.log(action, item);
		console.log('--ga--');
	};

	// App.events.ga.add(getEvent);
};

App.addItem = function (formats, isString) {
	var _formats = {};
	if (isString) {
		languages.forEach(function (language) {
			_formats[language.name] = formats;
		});
		formats = _formats;
	}

	App.preview.push(formats[App.activeLanguage]);
	App.jsFormat.push(formats.js);

	languages.forEach(function (language) {
		if (formats[language.name]) {
			if (!App.code[language.name]) App.code[language.name] = [];
			App.code[language.name].push(formats[language.name]);
		}
	});

	App.events.codeUpdated.dispatch();
};

App.keyboard = function () {
	$(document).bind('keydown', '-', function () {
		App.events.insertChar.dispatch('-');
	});
	$(document).bind('keydown', 'shift+-', function () {
		App.events.insertChar.dispatch('_');
	});
	$(document).bind('keydown', '=', function () {
		App.events.insertChar.dispatch('=');
	});
	$(document).bind('keydown', 'shift+=', function () {
		App.events.insertChar.dispatch('+');
	});
	$(document).bind('keydown', '[', function () {
		App.events.insertChar.dispatch('[');
	});
	$(document).bind('keydown', 'shift+[', function () {
		App.events.insertChar.dispatch('{');
	});
	$(document).bind('keydown', ']', function () {
		App.events.insertChar.dispatch(']');
	});
	$(document).bind('keydown', 'shift+]', function () {
		App.events.insertChar.dispatch('}');
	});
	$(document).bind('keydown', ';', function () {
		App.events.insertChar.dispatch(';');
	});
	$(document).bind('keydown', 'shift+;', function () {
		App.events.insertChar.dispatch(':');
	});
	$(document).bind('keydown', ',', function () {
		App.events.insertChar.dispatch(',');
	});
	$(document).bind('keydown', '.', function () {
		App.events.insertChar.dispatch('.');
	});
	$(document).bind('keydown', '/', function () {
		App.events.insertChar.dispatch('/');
	});
};

App.removeItem = function () {
	App.preview.splice(-1, 1);
	App.jsFormat.splice(-1, 1);
	$.each(App.code, function (index, val) {
		this.splice(-1, 1);
	});
	App.events.codeUpdated.dispatch();
};

var sections = [{
	title: 'Day of Month',
	items: [{ content: 'without leading zeros', formats: { js: 'D', php: 'j' } }, { content: 'without leading zeros with suffix', formats: { js: 'Do', php: 'jS' } }, { content: '2 digits with leading zeros', formats: { js: 'DD', php: 'd' } }]
}, {
	title: 'Day of Week',
	items: [{ content: 'without leading zeros', formats: { js: 'd', php: 'w' } }, { content: 'with leading zeros with suffix', formats: { js: 'do', php: '' } }, { content: 'two character abbreviation', formats: { js: 'dd', php: '' } }, { content: 'three character abbreviation', formats: { js: 'ddd', php: '' } }, { content: 'full textual representation', formats: { js: 'dddd', php: '' } }]
}];

var Button = React.createClass({
	displayName: 'Button',

	getInitialState: function getInitialState() {
		return { active: false };
	},
	getFormat: function getFormat() {
		return moment().format(this.props.formats.js);
	},
	handleClick: function handleClick(event) {
		var formats = this.props.formats;
		App.addItem(formats);
		App.events.ga.dispatch('clicked', 'button');
	},
	render: function render() {
		var activeClass = this.state.active ? ' is-active' : '';
		return React.createElement(
			'a',
			{ className: 'btn date' + activeClass, onClick: this.handleClick },
			this.getFormat()
		);
	}
});

var Description = React.createClass({
	displayName: 'Description',

	render: function render() {
		return React.createElement(
			'p',
			{ className: 'help-text' },
			this.props.content
		);
	}
});

var Item = React.createClass({
	displayName: 'Item',

	getInitialState: function getInitialState() {
		return { hidden: false };
	},
	getDefaultProps: function getDefaultProps() {
		return { content: '' };
	},
	checkFormat: function checkFormat(language) {
		if (this.props[language] == '') {
			this.setState({ hidden: true });
		} else {
			this.setState({ hidden: false });
		}
		App.activeLanguage = language;
	},
	componentDidMount: function componentDidMount() {
		App.events.languageUpdated.add(this.checkFormat);
	},
	componentWillUnmount: function componentWillUnmount() {
		App.events.languageUpdated.remove(this.checkFormat);
	},
	render: function render() {

		var itemClass = this.props.width == 'small' ? ['col-xs-4', 'col-sm-2'] : [];
		if (this.state.hidden) itemClass.push('format-hide');

		return React.createElement(
			'div',
			{ className: itemClass.join(' ') },
			React.createElement(Button, { formats: this.props.formats }),
			React.createElement(Description, { content: this.props.content })
		);
	}
});

var Items = React.createClass({
	displayName: 'Items',

	render: function render() {
		var data = this.props.data;
		return React.createElement(
			'div',
			null,
			data.map(function (item) {
				if (data.length) {}
				return React.createElement(Item, { width: 'small', formats: item.formats, content: item.content });
			})
		);
	}
});

var Section = React.createClass({
	displayName: 'Section',

	render: function render() {
		return React.createElement(
			'section',
			null,
			React.createElement(
				'div',
				{ className: "row" },
				React.createElement(
					'div',
					{ className: "col-xs-12" },
					React.createElement(
						'h4',
						null,
						this.props.title
					)
				)
			),
			React.createElement(
				'div',
				{ className: "row" },
				React.createElement(Items, { data: this.props.items })
			)
		);
	}
});

var Sections = React.createClass({
	displayName: 'Sections',

	render: function render() {
		var sections = this.props.sections;
		return React.createElement(
			'div',
			{ className: 'sections' },
			sections.map(function (section) {
				return React.createElement(Section, { title: section.title, items: section.items });
			})
		);
	}
});

var Languages = React.createClass({
	displayName: 'Languages',

	getInitialState: function getInitialState() {
		return { value: null };
	},
	handleChange: function handleChange(event) {

		App.events.languageUpdated.dispatch(event.target.value);
		App.preview = App.code[event.target.value];
		App.events.codeUpdated.dispatch();
		this.setState({ value: event.target.value });
	},
	render: function render() {
		var languages = this.props.languages;
		return React.createElement(
			'div',
			{ className: 'select' },
			React.createElement(
				'select',
				{ 'aria-label': 'Select Language', id: 'language', ref: 'languages', name: 'language', 'class': 'form-control', value: this.state.value, onChange: this.handleChange },
				languages.map(function (language) {
					return React.createElement(
						'option',
						{ value: language.name },
						language.value
					);
				})
			)
		);
	}
});

var LivePreview = React.createClass({
	displayName: 'LivePreview',

	getInitialState: function getInitialState() {
		return { value: '' };
	},
	updatePreview: function updatePreview() {
		var value = App.jsFormat.join('') == '' ? '' : moment().format(App.jsFormat.join(''));
		this.setState({ value: value });
	},
	componentDidMount: function componentDidMount() {
		App.events.codeUpdated.add(this.updatePreview);
	},
	componentWillUnmount: function componentWillUnmount() {
		App.events.codeUpdated.remove(this.updatePreview);
	},
	handleClick: function handleClick(event) {
		App.code = {};
		App.jsFormat = [];
		App.preview = [];
		App.events.codeUpdated.dispatch();
		event.preventDefault();
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'live-preview col-sm-6' },
			React.createElement(
				'h4',
				null,
				'Live Preview'
			),
			React.createElement('input', { type: 'text', disabled: true, className: 'input-text disabled', value: this.state.value }),
			React.createElement('input', { type: 'submit', value: 'reset', className: 'reset', onClick: this.handleClick })
		);
	}
});

var CodePreview = React.createClass({
	displayName: 'CodePreview',

	getInitialState: function getInitialState() {
		return { value: '', hidden: false, beforeMethod: '', afterMethod: '' };
	},
	updatePreview: function updatePreview() {

		var self = this;

		self.setState({ value: App.preview.join('') });

		languages.forEach(function (language, index) {
			if (App.activeLanguage == language.name) {
				var method = language.method.split('%%');
				self.setState({ beforeMethod: method[0], afterMethod: method[1] });
			}
		});
	},
	componentDidMount: function componentDidMount() {
		App.events.codeUpdated.add(this.updatePreview);
	},
	componentWillUnmount: function componentWillUnmount() {
		App.events.codeUpdated.remove(this.updatePreview);
	},
	render: function render() {

		var languages = this.props.languages;

		return React.createElement(
			'div',
			{ className: 'code-preview col-sm-6' },
			React.createElement(
				'h4',
				null,
				'Code'
			),
			React.createElement(
				'code',
				null,
				React.createElement(
					'span',
					{ 'class': 'before' },
					this.state.beforeMethod
				),
				this.state.value,
				React.createElement(
					'span',
					{ 'class': 'after' },
					this.state.afterMethod
				)
			)
		);
	}
});

var Preview = React.createClass({
	displayName: 'Preview',

	handleKeys: function handleKeys(event) {
		if (event.keyCode == 8) // backspace
			{
				App.removeItem();
				event.preventDefault();
			} else if (event.keyCode == 32) {
			App.addItem(' ', true);
			event.preventDefault();
		}
	},
	insertChar: function insertChar(char) {
		App.addItem(char, true);
	},
	componentDidMount: function componentDidMount() {
		$(document).on('keyup', this.handleKeys);
		App.events.insertChar.add(this.insertChar);
	},
	componentWillUnmount: function componentWillUnmount() {
		$(document).off('keyup', this.handleKeys);
		App.events.insertChar.remove(this.insertChar);
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(CodePreview, { languages: languages }),
			React.createElement(LivePreview, null)
		);
	}
});

App.boot();
// rendering below

React.render(React.createElement(Sections, { sections: sections }), $('.row.sections')[0]);

React.render(React.createElement(Preview, null), $('.preview')[0]);

React.render(React.createElement(Languages, { languages: languages }), $('.form-group.languages .input')[0]);
//# sourceMappingURL=app.js.map
