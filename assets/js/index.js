$(function() {
	
	var code = [],
		preview = [],
		jsFormat = [];

	$('.btn.date').each(function(){
		$(this).text(moment().format($(this).data('js-format'))); // insert date string based of current time
	});

	setInterval(function(){

		if(jsFormat != null)
		{
			$('.btn.date.live').each(function(){
				$(this).text(moment().format($(this).data('js-format')));
			});
			var jsString = '';
			$.each(jsFormat, function(index, val){
				jsString += moment().format(val);
			});
			$('.live-preview input[type="text"]').val( jsString );
		}

	}, 1000);

	$('.btn.date').on('click', function(e){
		
		var language = $('#language').val(),
				format = $(this).data(language + '-format'),
				momentFormat = $(this).data('js-format');
		
		preview.push(moment().format(momentFormat));
		jsFormat.push(momentFormat);
		code.push(format);
		buildViews();
		
		e.preventDefault();
	});

	$('.reset').on('click', function(e){
		
		code = [];
		preview = [];
		jsFormat = [];
		buildViews();
		
		e.preventDefault();
	});

	function insertChar(char)
	{
		code.push(char);
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
			e.preventDefault();
		}
		else if(e.keyCode == 8)
		{
			code.splice(-1,1);
			preview.splice(-1,1);
			jsFormat.splice(-1,1);
			e.preventDefault();
		}
		
		buildViews();
		
	});

	function checkFormats()
	{
		code = [];
		preview = [];
		jsFormat = [];
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
		}
	}

	function rememberSession()
	{
		if(Modernizr.localstorage)
		{
			code = (JSON.parse(localStorage.getItem('code')) == null) ? [] : JSON.parse(localStorage.getItem('code'));
			preview = (JSON.parse(localStorage.getItem('preview')) == null) ? [] : JSON.parse(localStorage.getItem('preview'));
			jsFormat = (JSON.parse(localStorage.getItem('jsFormat')) == null) ? [] : JSON.parse(localStorage.getItem('jsFormat'));
		}
	}
		
	function buildViews()
	{
		var language = $("#language").val();
		$('.code-preview code.' + language + ' span').text(code.join(''));
		$('.live-preview input[type="text"]').val(preview.join(''));
		$('.code-preview code').addClass('hide');
		$('.code-preview code.' + language).removeClass('hide');
		saveSession();
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

	rememberSession();
	buildViews();

});