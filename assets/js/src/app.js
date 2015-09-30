var languages = [
	{ name: 'js', value: 'Javascript', method: "moment().format('%%')" },
	{ name: 'php', value: 'PHP', method: "date('%%')" },
// 	{ name: 'ruby', value: 'Ruby'},
// 	{ name: 'python', value: 'Python' }
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

App.boot = function(){
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

var sections = [
	{
		title: 'Day of Month',
		items: [
			{ content: 'without leading zeros', formats: { js: 'D', php: 'j' } },
			{ content: 'without leading zeros with suffix', formats: { js: 'Do', php: 'jS' } },
			{ content: '2 digits with leading zeros', formats: { js: 'DD', php: 'd' } }
		]
	},
	{
		title: 'Day of Week',
		items: [
			{ content: 'without leading zeros', formats: { js: 'd', php: 'w' } },
			{ content: 'with leading zeros with suffix', formats: { js: 'do', php: '' } },
			{ content: 'two character abbreviation', formats: { js: 'dd', php: '' } },
			{ content: 'three character abbreviation', formats: { js: 'ddd', php: '' } },
			{ content: 'full textual representation', formats: { js: 'dddd', php: '' } },
		]
	}
];

var Button = React.createClass({
	getInitialState: function(){
		return { active: false }
	},
	getFormat: function(){
		return moment().format( this.props.formats.js );
	},
	handleClick: function(event){
		var formats = this.props.formats;		
		App.addItem(formats);
		App.events.ga.dispatch('clicked', 'button');
	},
	render: function(){
		var activeClass = (this.state.active) ? ' is-active' : '';
		return <a className={'btn date' + activeClass } onClick={this.handleClick}>{this.getFormat()}</a> 
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
		return { content: '' };
	},
	checkFormat: function(language){
		if(this.props[language] == '')
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
			<Button formats={this.props.formats} />
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
			 return <Item width={'small'} formats={item.formats} content={item.content} />
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
		App.preview = App.code[event.target.value];
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
		return { value: '', hidden: false, beforeMethod: '', afterMethod: '' };
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
	<Languages languages={languages} />,
	$('.form-group.languages .input')[0]
);