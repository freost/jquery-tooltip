/**

Tooltip

Copyright (c) 2010-2011, Frederic G. Østby
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the author nor the 
      names of its contributors may be used to endorse or promote products 
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

(function($)
{
	$.fn.tooltip = function(options)
	{	
		var settings =
		{
			offsetY : 15,
			offsetX : 0,
			fadeIn : 'slow',
			rounded : true,
			track : true
		};
		
		settings = $.extend({}, settings, options);
		
		var position = function(e)
		{
			var offsetX = 0;
			var offsetY = 0;
			
			var ttWidth = $('#tooltip').width();
			var ttHeight = $('#tooltip').height();
			
			// Do we need to flip it?
			
			if(((e.pageX - $(window).scrollLeft()) + settings.offsetX + ttWidth) >= $(window).width())
			{
				var x = 'R';
				
				offsetX = (settings.offsetX + ttWidth) * -1;
			}
			else
			{
				var x = 'L'
			}
			
			// Do we need to move it up?
			
			if(((e.pageY - $(window).scrollTop()) + settings.offsetY + ttHeight) >= $(window).height())
			{
				var y = 'B';
				var pointerPos = 'ttBottom';
				
				offsetY = (settings.offsetY + ttHeight) * -1;
				
				$('#ttTop').removeClass();
			}
			else
			{
				var y = 'T';
				var pointerPos = 'ttTop';
				
				$('#ttBottom').removeClass();
			}
			
			$('#' + pointerPos).removeClass().addClass('pointer').addClass('pointer' + y + x);
			
			// Position the tooltip
			
			offsetX = (offsetX == 0) ? settings.offsetX : offsetX;
			offsetY = (offsetY == 0) ? settings.offsetY : offsetY;
				
			$('#tooltip').css({top: e.pageY + offsetY, left: e.pageX + offsetX});
		};
		
		this.each(function(e)
		{
			var element = $(this);
			
			if(element.attr('title') !== undefined)
			{
				var title = element.attr('title');
				
				element.attr('title', '');
				
				element.hover(function(e)
				{	
					$('<div id="tooltip"><div id="ttTop"></div><div id="ttBody"></div><div id="ttBottom"></div></div>')
					.appendTo('body')
					.hide()
					.fadeIn(settings.fadeIn);
					
					$('#ttBody').html(title);
									
					position(e);
					
					if(settings.rounded == true)
					{
						$('#ttBody').addClass('rounded');
					}
				},
				function()
				{	
					$('#tooltip').remove();
				});
				
				if(settings.track == true)
				{
					element.mousemove(function(e)
					{
						position(e);
					});
				}
			}
		});
		
		return this;
	}
})(jQuery);