'use strict';

var languages = [{ name: 'js', value: 'Javascript', method: "moment().format('%%')" }, { name: 'php', value: 'PHP', method: "date('%%')" }, { name: 'ruby', value: 'Ruby', method: 'Time.new().strftime "%%"' }, { name: 'python', value: 'Python', method: "time.strftime('%%')" }];

window.App = {};

App.events = {
	codeUpdated: new signals.Signal(),
	languageUpdated: new signals.Signal(),
	insertChar: new signals.Signal(),
	preview: new signals.Signal(),
	ga: new signals.Signal()
};

App.code = {};
App.preview = [];
App.jsFormat = [];
App.activeLanguage = 'js';

App.mobileDetect = function () {
	return window.innerWidth <= 700 ? true : false;
};

App.buildLanguages = function () {
	languages.forEach(function (language) {
		App.code[language.name] = [];
	});
	App.preview = App.code[App.activeLanguage];
	App.events.codeUpdated.dispatch();
};

App.boot = function () {
	App.buildLanguages();
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

var presets = {
	items: [{ formats: { js: 'dddd, MMMM D YYYY', php: 'l, F j Y', ruby: '%A, %B %e %Y', python: '%A, %B %d %Y' } }, { formats: { js: 'MM/DD/YYYY', php: 'm/d/Y', ruby: '%m/%d/%Y', python: '%m/%d/%Y' } }, { formats: { js: 'MMMM YYYY', php: 'F Y', ruby: '%B %Y', python: '%B %Y' } }, { formats: { js: 'YYYY-MM-DD HH:mm:ss', php: 'Y-m-d H:i:s', ruby: '%Y-%m-%d %H:%M:%S', python: '%Y-%m-%d %H:%M:%S' }, live: true }]
};

var sections = [{
	title: 'Day of Month',
	items: [{ content: 'without leading zeros', formats: { js: 'D', php: 'j', ruby: '%e' } }, { content: 'without leading zeros with suffix', formats: { js: 'Do', php: 'jS' } }, { content: '2 digits with leading zeros', formats: { js: 'DD', php: 'd', ruby: '%d', python: '%d' } }]
}, {
	title: 'Day of Week',
	items: [{ content: 'without leading zeros', formats: { js: 'd', php: 'w', python: '%w' } }, { content: 'with leading zeros with suffix', formats: { js: 'do' } }, { content: 'two character abbreviation', formats: { js: 'dd' } }, { content: 'three character abbreviation', formats: { js: 'ddd', ruby: '%a', python: '%a' } }, { content: 'full textual representation', formats: { js: 'dddd', ruby: '%A', python: '%A' } }]
}, {
	title: 'Day of Year',
	items: [{ content: 'without leading zeros', formats: { js: 'DDD', php: 'z' } }, { content: 'without leading zeros with suffix', formats: { js: 'DDDo' } }, { content: 'with leading zeros', formats: { js: 'DDDD', ruby: '%j', python: '%j' } }]
}, {
	title: 'Week of Year',
	items: [{ content: 'without leading zeros', formats: { js: 'w' } }, { content: 'without leading zeros with suffix', formats: { js: 'wo' } }, { content: 'with leading zeros', formats: { js: 'ww', php: 'W', ruby: '%U', python: '%U' } }]
}, {
	title: 'Year',
	items: [{ content: 'two digit', formats: { js: 'YY', php: 'y', ruby: '%y', python: '%y' } }, { content: 'four digit', formats: { js: 'YYYY', php: 'Y', ruby: '%Y', python: '%Y' } }]
}, {
	title: 'Month',
	items: [{ content: 'without leading zeros', formats: { js: 'M', php: 'n', ruby: '%e' } }, { content: 'without leading zeros with suffix', formats: { js: 'Mo' } }, { content: 'with leading zeros', formats: { js: 'MM', php: 'm', ruby: '%m', python: '%m' } }, { content: 'abbreviation', formats: { js: 'MMM', php: 'M', ruby: '%b', python: '%b' } }, { content: 'full textual representation', formats: { js: 'MMMM', php: 'F', ruby: '%B', python: '%B' } }]
}, {
	title: 'Time',
	items: []
}, {
	title: 'Hours',
	items: [{ content: 'without leading zeros (12 hour)', formats: { js: 'h', php: 'g', ruby: '%1' }, live: true }, { content: 'with leading zeros (12 hour)', formats: { js: 'hh', php: 'h', ruby: '%I', python: '%I' }, live: true }, { content: 'without leading zeros (24 hour)', formats: { js: 'H', php: 'G', ruby: '%k' }, live: true }, { content: 'with leading zeros (24 hour)', formats: { js: 'HH', php: 'H', ruby: '%H', python: '%H' }, live: true }]
}, {
	title: 'Minutes',
	items: [{ content: 'without leading zeros', formats: { js: 'm' }, live: true }, { content: 'with leading zeros', formats: { js: 'mm', php: 'i', ruby: '%M', python: '%M' }, live: true }]
}, {
	title: 'Seconds',
	items: [{ content: 'without leading zeros', formats: { js: 's' }, live: true }, { content: 'with leading zeros', formats: { js: 'ss', php: 's', ruby: '%S', python: '%S' }, live: true }]
}, {
	title: 'AM/PM',
	items: [{ content: 'uppercase', formats: { js: 'A', php: 'A', ruby: '%p', python: '%p' }, live: true }, { content: 'lowercase', formats: { js: 'a', php: 'a', ruby: '%P' }, live: true }]
}, {
	title: 'Timezone',
	items: [{ content: 'Difference to GMT in hours with colon', formats: { js: 'Z', php: 'P', ruby: '%:z' } }, { content: 'Difference to GMT in hours', formats: { js: 'ZZ', php: 'O', ruby: '%z', python: '%z' } }]
}];

// mixins
var SetIntervalMixin = {
	componentWillMount: function componentWillMount() {
		this.intervals = [];
	},
	setInterval: (function (_setInterval) {
		function setInterval() {
			return _setInterval.apply(this, arguments);
		}

		setInterval.toString = function () {
			return _setInterval.toString();
		};

		return setInterval;
	})(function () {
		this.intervals.push(setInterval.apply(null, arguments));
	}),
	componentWillUnmount: function componentWillUnmount() {
		this.intervals.map(clearInterval);
	}
};
// end of mixins

var Button = React.createClass({
	displayName: 'Button',

	mixins: [SetIntervalMixin],
	getInitialState: function getInitialState() {
		return { active: false, format: this.getFormat() };
	},
	getFormat: function getFormat() {
		return moment().format(this.props.formats.js);
	},
	handleClick: function handleClick(event) {
		var formats = this.props.formats;

		if (this.props.preset) {
			App.code = {};
			App.preview = [];
			App.jsFormat = [];
		}

		App.addItem(formats);
		App.events.ga.dispatch('clicked', 'button');

		if (App.mobileDetect()) {
			App.events.preview.dispatch('show');
		}
	},
	updateFormat: function updateFormat() {
		var _format = this.getFormat();
		this.setState({ format: _format });
	},
	componentDidMount: function componentDidMount() {
		if (this.props.live) this.setInterval(this.updateFormat, 1000);
	},
	render: function render() {
		var additionalClasses = '';
		if (this.props.preset) additionalClasses += ' preset';
		var activeClass = this.state.active ? ' is-active' : '';
		return React.createElement(
			'a',
			{ className: 'btn date' + activeClass + additionalClasses, onClick: this.handleClick },
			this.state.format
		);
	}
});

var Preset = React.createClass({
	displayName: 'Preset',

	getInitialState: function getInitialState() {
		return { hidden: false };
	},
	getDefaultProps: function getDefaultProps() {
		return { live: false };
	},
	render: function render() {
		return React.createElement(Button, { formats: this.props.formats, live: this.props.live, preset: true });
	}
});

var Presets = React.createClass({
	displayName: 'Presets',

	render: function render() {
		var items = this.props.items;

		return React.createElement(
			'div',
			{ className: 'col-xs-12' },
			items.map(function (item) {
				return React.createElement(Preset, { formats: item.formats, live: item.live });
			})
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
		return { content: '', live: false };
	},
	checkFormat: function checkFormat(language) {
		if (!this.props.formats[language]) {
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
			React.createElement(Button, { formats: this.props.formats, live: this.props.live }),
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
				return React.createElement(Item, { width: 'small', formats: item.formats, live: item.live, content: item.content });
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
		App.buildLanguages();
		App.jsFormat = [];
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
			),
			React.createElement('span', null)
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
		var _value = App.preview.join(''),
		    _beforeMethod = '',
		    _afterMethod = '';

		languages.forEach(function (language, index) {
			if (App.activeLanguage == language.name) {
				var method = language.method.split('%%');
				_beforeMethod = method[0];
				_afterMethod = method[1];
			}
		});

		return { value: _value, hidden: false, beforeMethod: _beforeMethod, afterMethod: _afterMethod };
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

	getInitialState: function getInitialState() {
		return { visible: false };
	},
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
	showPreview: function showPreview() {
		this.setState({ visible: true });
	},
	hidePreview: function hidePreview() {
		this.setState({ visible: false });
	},
	togglePreview: function togglePreview() {
		if (this.state.visible) {
			this.hidePreview();
		} else {
			this.showPreview();
		}
	},
	handleEvent: function handleEvent(type) {
		if (type == 'show') this.showPreview();
		if (type == 'hide') this.hidePreview();
		if (type == 'toggle') this.togglePreview();
	},
	handleResize: function handleResize() {
		if (App.mobileDetect()) {
			this.hidePreview();
		} else {
			this.showPreview();
		}
	},
	componentDidMount: function componentDidMount() {
		$(document).bind('keyup', this.handleKeys);
		$(window).on('resize', this.handleResize);
		App.events.preview.add(this.handleEvent);
		App.events.insertChar.add(this.insertChar);
	},
	componentWillUnmount: function componentWillUnmount() {
		$(document).unbind('keyup', this.handleKeys);
		$(window).off('resize', this.handleResize);
		App.events.preview.remove(this.handleEvent);
		App.events.insertChar.remove(this.insertChar);
	},
	render: function render() {
		var visible = this.state.visible ? ' is-visible' : '';
		return React.createElement(
			'div',
			{ className: "fixed" + visible },
			React.createElement(
				'div',
				{ className: 'container-fluid' },
				React.createElement(
					'div',
					{ className: 'row preview' },
					React.createElement(CodePreview, { languages: languages }),
					React.createElement(LivePreview, null)
				)
			)
		);
	}
});

App.boot();
// rendering below

React.render(React.createElement(Sections, { sections: sections }), $('.row.sections')[0]);

React.render(React.createElement(Preview, null), $('#fixed')[0]);

React.render(React.createElement(Presets, { items: presets.items }), $('.presets')[0]);

React.render(React.createElement(Languages, { languages: languages }), $('.form-group.languages .input')[0]);
//# sourceMappingURL=app.js.map
