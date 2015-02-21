$(function() {
	
	var languages = [ {name: 'js', value: 'Javascript'}, {name: 'php', value: 'PHP'}, { name: 'ruby', value: 'Ruby'} ],
		code = {},
		preview = [],
		jsFormat = [];

	function resetStorage()
	{
		$.each(languages, function(){
			code[this.name] = [];
		});
		preview = [];
		jsFormat = [];
	}

	function addCode(btn)
	{
		$.each(languages, function(){
			if(typeof btn == 'string')
			{
				code[this.name].push(btn);
			}
			else
			{
				code[this.name].push($(btn).data(this.name + '-format'));
			}
		});
	}

	function removeLastCode()
	{
		var language = $("#language").val();
		$.each(code, function(){
			this.splice(-1,1);
		});
	}

	resetStorage();

	$('.btn.date').each(function(){
		$(this).text(moment().format($(this).data('js-format'))); // insert date string based of current time
	});

	setInterval(function(){

		$('.btn.date.live').each(function(){
			$(this).text(moment().format($(this).data('js-format')));
		});

		if(jsFormat != null)
		{
			var jsString = '';
			$.each(jsFormat, function(index, val){
				jsString += moment().format(val);
			});
			$('.live-preview input[type="text"]').val( jsString );
		}

	}, 1000);

	$('.btn.date').on('click', function(e){
		
		var language = $('#language').val(),
			momentFormat = $(this).data('js-format');

		if($(this).hasClass('preset'))
		{
			resetStorage();
		}
		
		preview.push(moment().format(momentFormat));
		jsFormat.push(momentFormat);
		addCode(this);
		buildViews();
		
		e.preventDefault();
	});

	$('.reset').on('click', function(e){
		
		resetStorage();
		buildViews();
		
		e.preventDefault();
	});

	function insertChar(char)
	{
		addCode(char);
		preview.push(char);
		jsFormat.push(char);
		buildViews();
	}

	$(document).bind('keydown', '-', function(){ insertChar('-'); });
	$(document).bind('keydown', 'shift+-', function(){ insertChar('_'); });
	$(document).bind('keydown', '=', function(){ insertChar('='); });
	$(document).bind('keydown', 'shift+=', function(){ insertChar('+'); });
	$(document).bind('keydown', '[', function(){ insertChar('['); });
	$(document).bind('keydown', 'shift+[', function(){ insertChar('{'); });
	$(document).bind('keydown', ']', function(){ insertChar(']'); });
	$(document).bind('keydown', 'shift+]', function(){ insertChar('}'); });
	$(document).bind('keydown', ';', function(){ insertChar(';'); });
	$(document).bind('keydown', 'shift+;', function(){ insertChar(':'); });
	$(document).bind('keydown', ',', function(){ insertChar(','); });
	$(document).bind('keydown', '.', function(){ insertChar('.'); });
	$(document).bind('keydown', '/', function(){ insertChar('/'); });

	$(document).bind('keydown', function(e){
		
		if(e.keyCode == 32)
		{
			insertChar(' ');
			buildViews();
			e.preventDefault();
		}
		else if(e.keyCode == 8)
		{
			removeLastCode();
			preview.splice(-1,1);
			jsFormat.splice(-1,1);
			buildViews();
			e.preventDefault();
		}
		
	});

	function checkFormats()
	{
		var language = $("#language").val();
		$('.btn.date').each(function(){
			$(this).parent().removeClass("format-hide");
			if($(this).data( language + '-format') == "" || !$(this).data( language + '-format')) $(this).parent().addClass('format-hide');
		});

		$('.code-preview code').addClass('hide');
		$('.code-preview code.' + language).removeClass('hide');
		
		$('.directions').addClass('hide');
		$(".directions-" + language).removeClass('hide');
		
		$('.code-preview h4').text('Code (' + $('#language option[value="' + language + '"]').text() + ')');
		buildViews();
	}

	$("#language").on('change', checkFormats);
	checkFormats();

	function saveSession()
	{
		if(Modernizr.localstorage)
		{
			localStorage.setItem('code', JSON.stringify(code));
			localStorage.setItem('preview', JSON.stringify(preview));
			localStorage.setItem('jsFormat', JSON.stringify(jsFormat));
			localStorage.setItem('language', $("#language").val());
		}
	}

	function rememberSession()
	{
		if(Modernizr.localstorage)
		{
			if(JSON.parse(localStorage.getItem('code')) != null)
			{
				code = JSON.parse(localStorage.getItem('code'));
				console.log('not null', code);
			}

			preview = (JSON.parse(localStorage.getItem('preview')) == null) ? [] : JSON.parse(localStorage.getItem('preview'));
			jsFormat = (JSON.parse(localStorage.getItem('jsFormat')) == null) ? [] : JSON.parse(localStorage.getItem('jsFormat'));

			if(localStorage.getItem('language'))
			{
				$("#language")
				.val(localStorage.getItem('language'))
				.trigger('change');
			}
		}
	}
		
	function buildViews()
	{
		var language = $("#language").val();

		$('.code-preview code').each(function(){
			$(this).find('span').text(code[$(this).data('language')].join(''));
		});

		$('.live-preview input[type="text"]').val(preview.join(''));
		$('.code-preview code').addClass('hide');
		$('.code-preview code.' + language).removeClass('hide');
		// saveSession();
	}

	ZeroClipboard.config({ swfPath: 'assets/flash/ZeroClipboard.swf' });
	var client = new ZeroClipboard( $('#copy') );

	$("#copy").on('click', function(e){
		e.preventDefault();
	});

	client.on('ready', function(event){

		client.on( "copy", function (event) {
		  var clipboard = event.clipboardData;
		  clipboard.setData( "text/plain", $("code." + $("#language").val()).text() );
		});

		client.on( "aftercopy", function( event ){
	    	$("#copy").addClass('active');
	    	setTimeout(function() {
	    		$("#copy").removeClass('active');
	    	}, 100);
		});

	});

	// rememberSession();
	buildViews();

});