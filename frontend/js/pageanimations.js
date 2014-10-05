$(document).ready(function()
{
	var heightNow = $(window).height();
	var formTop = (heightNow/2) - 170;
	$("#register-form").css('margin-top',formTop);
});

$(function()
{
	var heightNow = $(window).height();
	
	$(window).scroll(function()
	{ 
		if ($(this).scrollTop() > heightNow - 218)
		{ 
			$("#nav:hidden").css('visibility','visible');   
			$("#nav:hidden").fadeIn('slow');  
		} 
		else
		{     
			$("#nav:visible").fadeOut("slow"); 
		}
	});
});

$(window).resize(function()
{
	var heightNow = $(window).height();
	var titleMargin = (heightNow/2) - 135;
	var aboutMargin = (heightNow/2) - (385/2) - 30;
	var resumeMargin = (heightNow/2) - (585/2) - 30;
	var portfolioMargin = (heightNow/2) - (600/2);
	var contactMargin = (heightNow/2) - (375/2) - 30;
	$("#titlewrap").css('padding-top',titleMargin);
	$("#contactsuccesswrap").css('padding-top',titleMargin);
	$("#contactfailedwrap").css('padding-top',titleMargin);
	$("#aboutwrap").css('padding-top',aboutMargin);
	$("#resumewrap").css('padding-top',resumeMargin);
	$("#portfoliowrap").css('padding-top',portfolioMargin);
	$("#contactwrap").css('padding-top',contactMargin);
	
	$("#page1").css('height',heightNow);
	$("#page2").css('height',heightNow);
	$("#page3").css('height',heightNow);
	$("#page4").css('height',heightNow);
	$("#page5").css('height',heightNow);
	
	if ($(window).scrollTop() > heightNow - 218)
	{ 
		$("#nav:hidden").css('visibility','visible');   
		$("#nav:hidden").fadeIn('slow');  
	} 
	else
	{     
		$("#nav:visible").fadeOut("slow"); 
	}
});