var languages = [
	{ name: 'js', value: 'Javascript', method: "moment().format('%%')" },
	{ name: 'php', value: 'PHP', method: "date('%%')" },
	{ name: 'ruby', value: 'Ruby', method: 'Time.new().strftime "%%"' },
	{ name: 'python', value: 'Python', method: "time.strftime('%%')" }
];

window.App = {};

App.events = {
	codeUpdated: new signals.Signal(),
	languageUpdated: new signals.Signal(),
	insertChar: new signals.Signal(),
	ga: new signals.Signal()
}

App.code = {};
App.preview = [];
App.jsFormat = [];
App.activeLanguage = 'js';

App.buildLanguages = function(){
	languages.forEach(function(language){
		App.code[language.name] = [];
	});
	App.preview = App.code[App.activeLanguage];
	App.events.codeUpdated.dispatch();
}

App.boot = function(){
	App.buildLanguages();
	App.keyboard();
	App.ga();
}

App.ga = function(){

	var getEvent = function(action, item){
		console.log('--ga--');
		console.log(action, item);
		console.log('--ga--');
	}

	// App.events.ga.add(getEvent);

};

App.addItem = function(formats, isString)
{
	var _formats = {};
	if(isString)
	{
		languages.forEach(function(language){
			_formats[language.name] = formats;
		});
		formats = _formats;
	}

	App.preview.push(formats[App.activeLanguage]);
	App.jsFormat.push(formats.js);
	
	languages.forEach(function(language){
		if(formats[language.name])
		{
			if(!App.code[language.name]) App.code[language.name] = [];
			App.code[language.name].push(formats[language.name]);
		}
	});
	
	App.events.codeUpdated.dispatch();
}

App.keyboard = function(){
	$(document).bind('keydown', '-', function(){ App.events.insertChar.dispatch('-'); });
	$(document).bind('keydown', 'shift+-', function(){ App.events.insertChar.dispatch('_'); });
	$(document).bind('keydown', '=', function(){ App.events.insertChar.dispatch('='); });
	$(document).bind('keydown', 'shift+=', function(){ App.events.insertChar.dispatch('+'); });
	$(document).bind('keydown', '[', function(){ App.events.insertChar.dispatch('['); });
	$(document).bind('keydown', 'shift+[', function(){ App.events.insertChar.dispatch('{'); });
	$(document).bind('keydown', ']', function(){ App.events.insertChar.dispatch(']'); });
	$(document).bind('keydown', 'shift+]', function(){ App.events.insertChar.dispatch('}'); });
	$(document).bind('keydown', ';', function(){ App.events.insertChar.dispatch(';'); });
	$(document).bind('keydown', 'shift+;', function(){ App.events.insertChar.dispatch(':'); });
	$(document).bind('keydown', ',', function(){ App.events.insertChar.dispatch(','); });
	$(document).bind('keydown', '.', function(){ App.events.insertChar.dispatch('.'); });
	$(document).bind('keydown', '/', function(){ App.events.insertChar.dispatch('/'); });	
}

App.removeItem = function(){
	App.preview.splice(-1,1);
	App.jsFormat.splice(-1,1);
	$.each(App.code, function(index, val){
		this.splice(-1,1);
	});
	App.events.codeUpdated.dispatch();
}

var presets = {
	items: [
		{ formats: { js: 'dddd, MMMM D YYYY', php: 'l, F j Y', ruby: '%A, %B %e %Y', python: '%A, %B %d %Y' }, },
		{ formats: { js: 'MM/DD/YYYY', php: 'm/d/Y', ruby: '%m/%d/%Y', python: '%m/%d/%Y' }},
		{ formats: { js: 'MMMM YYYY', php: 'F Y', ruby: '%B %Y', python: '%B %Y' }},
		{ formats: { js: 'YYYY-MM-DD HH:mm:ss', php: 'Y-m-d H:i:s', ruby: '%Y-%m-%d %H:%M:%S', python: '%Y-%m-%d %H:%M:%S' }, live: true },
	]
};

var sections = [
	{
		title: 'Day of Month',
		items: [
			{ content: 'without leading zeros', formats: { js: 'D', php: 'j', ruby: '%e' } },
			{ content: 'without leading zeros with suffix', formats: { js: 'Do', php: 'jS' } },
			{ content: '2 digits with leading zeros', formats: { js: 'DD', php: 'd', ruby: '%d', python: '%d' } }
		]
	},
	{
		title: 'Day of Week',
		items: [
			{ content: 'without leading zeros', formats: { js: 'd', php: 'w', python: '%w' } },
			{ content: 'with leading zeros with suffix', formats: { js: 'do' } },
			{ content: 'two character abbreviation', formats: { js: 'dd' } },
			{ content: 'three character abbreviation', formats: { js: 'ddd', ruby: '%a', python: '%a' } },
			{ content: 'full textual representation', formats: { js: 'dddd', ruby: '%A', python: '%A' } },
		]
	},
	{
		title: 'Day of Year',
		items: [
			{ content: 'without leading zeros', formats: { js: 'DDD', php: 'z' } },
			{ content: 'without leading zeros with suffix', formats: { js: 'DDDo' } },
			{ content: 'with leading zeros', formats: { js: 'DDDD', ruby: '%j', python: '%j' } },
		]
	},
	{
		title: 'Week of Year',
		items: [
			{ content: 'without leading zeros', formats: { js: 'w' } },
			{ content: 'without leading zeros with suffix', formats: { js: 'wo' } },
			{ content: 'with leading zeros', formats: { js: 'ww', php: 'W', ruby: '%U', python: '%U' } },
		]
	},
	{
		title: 'Year',
		items: [
			{ content: 'two digit', formats: { js: 'YY', php: 'y', ruby: '%y', python: '%y' } },
			{ content: 'four digit', formats: { js: 'YYYY', php: 'Y', ruby: '%Y', python: '%Y' } },
		]
	},
	{
		title: 'Month',
		items: [
			{ content: 'without leading zeros', formats: { js: 'M', php: 'n', ruby: '%e' } },
			{ content: 'without leading zeros with suffix', formats: { js: 'Mo' } },
			{ content: 'with leading zeros', formats: { js: 'MM', php: 'm', ruby: '%m', python: '%m' } },
			{ content: 'abbreviation', formats: { js: 'MMM', php: 'M', ruby: '%b', python: '%b' } },
			{ content: 'full textual representation', formats: { js: 'MMMM', php: 'F', ruby: '%B', python: '%B' } },
		]
	},
	{
		title: 'Time',
		items: []
	},
	{
		title: 'Hours',
		items: [
			{ content: 'without leading zeros (12 hour)', formats: { js: 'h', php: 'g', ruby: '%1' }, live: true },
			{ content: 'with leading zeros (12 hour)', formats: { js: 'hh', php: 'h', ruby: '%I', python: '%I' }, live: true },
			{ content: 'without leading zeros (24 hour)', formats: { js: 'H', php: 'G', ruby: '%k' }, live: true },
			{ content: 'with leading zeros (24 hour)', formats: { js: 'HH', php: 'H', ruby: '%H', python: '%H' }, live: true },
		]
	},
	{
		title: 'Minutes',
		items: [
			{ content: 'without leading zeros', formats: { js: 'm' }, live: true },
			{ content: 'with leading zeros', formats: { js: 'mm', php: 'i', ruby: '%M', python: '%M' }, live: true },
		]
	},
	{
		title: 'Seconds',
		items: [
			{ content: 'without leading zeros', formats: { js: 's' }, live: true },
			{ content: 'with leading zeros', formats: { js: 'ss', php: 's', ruby: '%S', python: '%S' }, live: true },
		]
	},
	{
		title: 'AM/PM',
		items: [
			{ content: 'uppercase', formats: { js: 'A', php: 'A', ruby: '%p', python: '%p' }, live: true },
			{ content: 'lowercase', formats: { js: 'a', php: 'a', ruby: '%P' }, live: true },
		]
	},
	{
		title: 'Timezone',
		items: [
			{ content: 'Difference to GMT in hours with colon', formats: { js: 'Z', php: 'P', ruby: '%:z' } },
			{ content: 'Difference to GMT in hours', formats: { js: 'ZZ', php: 'O', ruby: '%z', python: '%z' } },
		]
	},
];

// mixins
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};
// end of mixins

var Button = React.createClass({
	mixins: [SetIntervalMixin],
	getInitialState: function(){
		return { active: false, format: this.getFormat() }
	},
	getFormat: function(){
		return moment().format( this.props.formats.js );
	},
	handleClick: function(event){
		var formats = this.props.formats;
		
		if(this.props.preset)
		{
			App.code = {}
			App.preview = [];
			App.jsFormat = [];
		}

		App.addItem(formats);
		App.events.ga.dispatch('clicked', 'button');
	},
	updateFormat: function(){
		var _format = this.getFormat();
		this.setState({ format: _format });
	},
	componentDidMount: function(){
		if(this.props.live) this.setInterval(this.updateFormat, 1000);
	},
	render: function(){
		var additionalClasses = '';
		if(this.props.preset) additionalClasses += ' preset';
		var activeClass = (this.state.active) ? ' is-active' : '';
		return <a className={'btn date' + activeClass + additionalClasses } onClick={this.handleClick}>{this.state.format}</a> 
	}
});

var Preset = React.createClass({
	getInitialState: function(){
		return { hidden: false };
	},
	getDefaultProps: function(){
		return { live: false };
	},
	render: function(){
		return <Button formats={this.props.formats} live={this.props.live} preset={true} />
	}
});

var Presets = React.createClass({
	
	render: function(){
		var items = this.props.items;

		return <div className="col-xs-12">
			{items.map(function(item){
				return <Preset formats={item.formats} live={item.live} />
			})}
		</div>;
	}
});

var Description = React.createClass({
	render: function(){
		return <p className={'help-text'}>{this.props.content}</p>
	}
});

var Item = React.createClass({
	getInitialState: function(){
		return { hidden: false };
	},
	getDefaultProps: function(){
		return { content: '', live: false };
	},
	checkFormat: function(language){
		if(!this.props.formats[language])
		{
			this.setState({ hidden: true });
		}
		else
		{
			this.setState({ hidden: false });
		}
		App.activeLanguage = language;
	},
	componentDidMount: function(){
		App.events.languageUpdated.add(this.checkFormat);
	},
	componentWillUnmount: function(){
		App.events.languageUpdated.remove(this.checkFormat);
	},
	render: function(){
		
		var itemClass = (this.props.width == 'small') ? ['col-xs-4', 'col-sm-2'] : [];
		if(this.state.hidden) itemClass.push('format-hide');
		
		return <div className={itemClass.join(' ')}>
			<Button formats={this.props.formats} live={this.props.live} />
			<Description content={this.props.content} />
		</div>;
	}
});

var Items = React.createClass({
	render: function(){
		var data = this.props.data;
		return <div>
			{data.map(function(item){
			 if(data.length){
			 	
			 }
			 return <Item width={'small'} formats={item.formats} live={item.live} content={item.content} />
			})}
		</div>
	}
});

var Section = React.createClass({
	render: function(){
		return <section>
			<div className={"row"}>
				<div className={"col-xs-12"}>
					<h4>{this.props.title}</h4>
				</div>
			</div>
			<div className={"row"}>
				<Items data={this.props.items} />
			</div>
		</section>
	}
});

var Sections = React.createClass({
	render: function(){
		var sections = this.props.sections;
		return <div className="sections">
			{sections.map(function(section){
			 return <Section title={section.title} items={section.items} />
			})}
		</div>
	}	
});

var Languages = React.createClass({
	getInitialState: function(){
		return { value: null };
	},
	handleChange: function(event){
		
		App.events.languageUpdated.dispatch(event.target.value);
		App.buildLanguages();
		App.jsFormat = [];
		App.events.codeUpdated.dispatch();
		this.setState({ value: event.target.value });
		
	},
	render: function(){
		var languages = this.props.languages;
		return <div className={'select'}>
			<select aria-label="Select Language" id="language" ref="languages" name="language" class="form-control" value={this.state.value} onChange={this.handleChange}>
				{languages.map(function(language){
					return <option value={language.name}>{language.value}</option>
				})}
			</select>
			<span></span>
		</div>
	}
});

var LivePreview = React.createClass({
	getInitialState: function(){
		return { value: '' };
	},
	updatePreview: function(){
		var value = (App.jsFormat.join('') == '') ? '' : moment().format(App.jsFormat.join(''));
		this.setState({ value: value });
	},
	componentDidMount: function(){
		App.events.codeUpdated.add(this.updatePreview);
	},
	componentWillUnmount: function(){
		App.events.codeUpdated.remove(this.updatePreview);
	},
	handleClick: function(event){
		App.code = {};
		App.jsFormat = [];
		App.preview = [];
		App.events.codeUpdated.dispatch();
		event.preventDefault();
	},
	render: function(){
		return <div className={'live-preview col-sm-6'}>
			<h4>Live Preview</h4>
			<input type="text" disabled className={'input-text disabled'} value={this.state.value} />
			<input type="submit" value="reset" className={'reset'} onClick={this.handleClick} />
		</div>
	}
});

var CodePreview = React.createClass({
	getInitialState: function(){
		var _value = App.preview.join(''),
			_beforeMethod = '', _afterMethod = '';

		languages.forEach(function(language, index){
			if(App.activeLanguage == language.name)
			{
				var method = language.method.split('%%');
				_beforeMethod = method[0];
				_afterMethod= method[1];
			}
		});
			
		return { value: _value, hidden: false, beforeMethod: _beforeMethod, afterMethod: _afterMethod };
	},
	updatePreview: function(){
		
		var self = this;
		self.setState({ value: App.preview.join('') });
		
		languages.forEach(function(language, index){
			if(App.activeLanguage == language.name)
			{
				var method = language.method.split('%%');
				self.setState({ beforeMethod: method[0], afterMethod: method[1] });
			}
		});
	},
	componentDidMount: function(){
		App.events.codeUpdated.add(this.updatePreview);
	},
	componentWillUnmount: function(){
		App.events.codeUpdated.remove(this.updatePreview);
	},
	render: function(){
		
		var languages = this.props.languages
		
		return <div className={'code-preview col-sm-6'}>
			<h4>Code</h4>
			<code><span class="before">{this.state.beforeMethod}</span>{this.state.value}<span class="after">{this.state.afterMethod}</span></code>
		</div>
	}
});

var Preview = React.createClass({
	handleKeys: function(event){
		if(event.keyCode == 8) // backspace
		{
			App.removeItem();
			event.preventDefault();
		}
		else if(event.keyCode == 32)
		{
			App.addItem(' ', true);
			event.preventDefault();
		}
		
	},
	insertChar: function(char){
		App.addItem(char, true);
	},
	componentDidMount: function(){
		$(document).on('keyup', this.handleKeys);
		App.events.insertChar.add(this.insertChar);
	},
	componentWillUnmount: function(){
		$(document).off('keyup', this.handleKeys);
		App.events.insertChar.remove(this.insertChar);
	},
	render: function(){
		return <div>
			<CodePreview languages={languages} />
			<LivePreview />
		</div>
	}
});

App.boot();
// rendering below

React.render(
	<Sections sections={sections} />,
	$('.row.sections')[0]
);

React.render(
	<Preview />,
	$('.preview')[0]
);

React.render(
	<Presets items={presets.items} />,
	$('.presets')[0]
);

React.render(
	<Languages languages={languages} />,
	$('.form-group.languages .input')[0]
);