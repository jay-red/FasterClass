/*
{"type":"header","content":""}
{"type":"subheader","content":""}

{"type":"image","src":""}

{"type":"paragraph","content":[]}
{"type":"text","content":""}
{"type":"link","content":"","src":""}
{"type":"inline","content":""}

{"type":"hr"}
{"type":"code","content":""}
*/

function Header( content ) {
	this.type = "header";
	this.content = content;
}

function Subheader( content ) {
	this.type = "header";
	this.content = content;
}

function Image( src ) {
	this.type = "image";
	this.src = src;
}

function Paragraph( content ) {
	this.type = "paragraph";
	this.content = content;
}

function Text( content ) {
	this.type = "text";
	this.content = content;
}

function Link( content, src ) {
	this.type = "link";
	this.content = content;
	this.src = src;
}

function Inline( content ) {
	this.type = "inline";
	this.content = content;
}

function HR() {
	this.type = "hr";
}

function Code( content ) {
	this.type = "code";
	this.content = content;
}