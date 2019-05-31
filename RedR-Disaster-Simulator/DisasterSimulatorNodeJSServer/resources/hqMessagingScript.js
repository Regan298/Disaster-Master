var htmlContent = "<h1>Communication</h1><br>\n" +
	"\n" +
	"<ul id=\"ngoList\">\n" +
	"\n" +
	"</ul>\n" +
	"<label for=\"ngoRecipient\"> Recipient:  </label>\n" +
	"<select form = \"messageHQ\" id=\"ngoRecipient\">\n" +
	"\n" +
	"</select>\n" +
	"\n" +
	"<br>\n" +
	"Message:<br>\n" +
	"<form action=\"\" id=\"messageHQ\">\n" +
	"\t<textarea style=\"resize:none;height:400px;width:800px\" maxlength=\"10000\" form=\"messageHQ\" id=\"input\"></textarea>\n" +
	"\t<input type=\"submit\" value=\"Send\" class=\"button\"/>\n" +
	"</form>";


$(htmlContent).appendTo(".messaging");