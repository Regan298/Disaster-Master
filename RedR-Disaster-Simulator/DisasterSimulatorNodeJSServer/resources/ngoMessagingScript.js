var htmlContent = "\n" +
	"<ul id=\"ngoList\">\n" +
	"\n" +
	"</ul>\n" +
	"<label for=\"ngoRecipient\"> Recipient:  </label>\n" +
	"<select form = \"messageNGO\" id=\"ngoRecipient\">\n" +
	"\n" +
	"</select>\n" +
	"\n" +
	"<br><br>\n" +
	"Message:<br>\n" +
	"<br>" +
	"<form action=\"\" id=\"messageNGO\">\n" +
	"\t<textarea style=\"resize:none;height:400px;width:800px\" maxlength=\"10000\" form=\"messageNGO\" id=\"input\"></textarea>\n" +
	"<br>" +
	"\t<input type=\"submit\" value=\"Send\" class=\"button\"/>\n" +
	"</form>";


$(htmlContent).appendTo(".messaging");