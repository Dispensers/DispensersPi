/* -------- Main Window -------- */

class MainWindow {
	constructor() {
		console.log(`${window.innerHeight}px`);
		console.log(`${window.innerWidth}px`);
		console.log(`${window.devicePixelRatio}`);
		
		this.innerHeight = window.innerHeight;
		this.innerWidth = window.innerWidth;
		this.devicePixelRatio = window.devicePixelRatio;
	}
}

let mainWindow = new MainWindow();


/* -------- Utility Functions -------- */

function wait(duration) {
	return new Promise((resolve, reject) => {setTimeout(resolve, duration)});
}

function disableScrolling() {
	document.body.classList.add("DisableScrolling");
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	window.onscroll = function() {window.scrollTo(scrollLeft, scrollTop);};
}

function enableScrolling() {
	document.body.classList.remove("DisableScrolling");
	window.onscroll = function() {};
}


/* -------- Published -------- */

function publishedOnClick(eventObject) {
	const target = eventObject.target;
	target.style.color = "#551A8B";
	const id = target.id;
	indexAsString = id.split("-")[1];
	index = Number(indexAsString);

	disableScrolling();
	const newPunterPuzzle = new Puzzle(puzzleSpecs[index]);
	reconfigure(newPunterPuzzle);
	mainWall.show();	
	punter.solveBiz.wake();
}

class Published {
	constructor() {
		const publishedRef = document.querySelector("#iwTCPublishedPuzzles-2");
		for (let i = 0; i < puzzleSpecs.length; i++) {
			const puzzleSpec = puzzleSpecs[i];
			const puzzleRef = document.createElement("button");
			puzzleRef.id = "iwTCPublishedPuzzle-" + String(i);
			puzzleRef.type = "button";
			puzzleRef.style =
				"margin:0; padding:0.5em 0 0.5em 0; border:none; background-color:transparent; " +
				"box-sizing:border-box; width:12.5%; " +
				"font-size:2.5em; text-decoration-line:underline;";
			if (i == 0) {
				puzzleRef.style.color = "#551A8B";
			}
			else {
				puzzleRef.style.color = "#0000EE";
			}
			puzzleRef.append(String(puzzleSpec.number));
			puzzleRef.addEventListener("click", publishedOnClick);
			publishedRef.append(puzzleRef);
		}
	}
}


/* -------- Puzzle -------- */

class Puzzle {
	constructor(puzzleSpec) {
		this.number = puzzleSpec.number;
		this.publishedOn = puzzleSpec.publishedOn;
		this.dispenserFullSpec = puzzleSpec.dispenserSpec;
		this.targetSpec = puzzleSpec.targetSpec;
		this.hintSpec = puzzleSpec.hintSpec;
		this.solutionExpression = puzzleSpec.solutionExpression;
		this.solutionDispenseSequence = puzzleSpec.solutionDispenseSequence;
		this.numDispensers = this.dispenserFullSpec.length - 1;
		this.dispenserHeightSpec = [undefined];
		for (let i = 1; i <= this.numDispensers; i++) this.dispenserHeightSpec[i] = this.dispenserFullSpec[i].length;
		this.maxDispenserHeight = 1;
		for (let d = 1; d <= this.numDispensers; d++) {
			if (this.dispenserHeightSpec[d] > this.maxDispenserHeight) this.maxDispenserHeight = this.dispenserHeightSpec[d];
		};
	}
	
	deconstruct() {
	}
};


/* -------- Main Wall -------- */

const mainWallSpec = {
	mwNumGridColumns: 59,
	mwHeightAboveDoor: 10,

	mwdHeightAbovePanel: 12,
	mwdHeightBelowPanel: 21,

	mwdpHeightAboveDispensers: 3,
	mwdpHeightBelowDispensers: 26,
	mwdpContainerCompartmentHeight: 7
};

class MainWall {
	constructor(mainWallSpec, punterPuzzle) {
		this.wallRef = document.querySelector("#mainWall");
		this.doorRef = document.querySelector("#mwDoor");
		this.panelRef = document.querySelector("#mwdPanel");
		
		this.dispenserRefsInUse = []
		const dispensersId = "#mwdpDispensers-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers);
		const dispensersRef = document.querySelector(dispensersId);
		this.dispenserRefsInUse.push(dispensersRef);
		dispensersRef.style.display = `grid`;
		//+2 for item positioning
		const dispensersHeight = (mainWallSpec.mwdpContainerCompartmentHeight * punterPuzzle.maxDispenserHeight) + 2;
		dispensersRef.style.height = `${dispensersHeight}em`;
		
		for (let d = 1; d <= punterPuzzle.numDispensers; d++) {
			const numItems = punterPuzzle.dispenserHeightSpec[d];
			const containerId = "#mwdpdContainer-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers) + "-" + String(d) + String(numItems);
			const containerRef = document.querySelector(containerId);
			this.dispenserRefsInUse.push(containerRef);
			containerRef.style.display = `block`;
			const borderId = "#mwdpdBorder-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers) + "-" + String(d) + String(numItems);
			const borderRef = document.querySelector(borderId);
			this.dispenserRefsInUse.push(borderRef);
			borderRef.style.display = `block`;
			for (let i = 1; i <= numItems; i++) {
				const itemId = "#mwdpdItem-" + String(punterPuzzle.maxDispenserHeight) + String(punterPuzzle.numDispensers) + "-" + String(d) + String(i);
				const itemRef = document.querySelector(itemId);
				this.dispenserRefsInUse.push(itemRef);
				itemRef.style.display = `block`;
			}
		}

		//const panelRef = document.querySelector("#mwdPanel");
		this.frPanelDispensers = String(dispensersHeight);
		const panelStyle = this.panelRef.style.cssText;
		let newPanelStyle = panelStyle.replace(/999/, this.frPanelDispensers);
		//const newPanelStyle = panelStyle.replace(/999/, String(dispensersHeight));
		this.panelRef.style.cssText = newPanelStyle;
		const panelHeight = mainWallSpec.mwdpHeightAboveDispensers + dispensersHeight + mainWallSpec.mwdpHeightBelowDispensers;
		this.panelRef.style.height = `${panelHeight}em`;

		//const doorRef = document.querySelector("#mwDoor");
		const doorStyle = this.doorRef.style.cssText;
		this.frDoorPanel = String(panelHeight);
		const newDoorStyle = doorStyle.replace(/999/, this.frDoorPanel);
		//const newDoorStyle = doorStyle.replace(/999/, String(panelHeight));
		this.doorRef.style.cssText = newDoorStyle;
		const doorHeight = mainWallSpec.mwdHeightAbovePanel + panelHeight + mainWallSpec.mwdHeightBelowPanel;
		this.doorRef.style.height = `${doorHeight}em`;

		const wallStyle = this.wallRef.style.cssText;
		this.frWallDoor = String(doorHeight);
		const newWallStyle = wallStyle.replace(/999/, this.frWallDoor);
		//const newWallStyle = wallStyle.replace(/999/, String(doorHeight));
		this.wallRef.style.cssText = newWallStyle;
		const wallHeight = mainWallSpec.mwHeightAboveDoor + doorHeight;
		this.wallRef.style.height = `${wallHeight}em`;


		let innerDimension = 0
		let gridDimension = 0
		if ((mainWindow.innerHeight / wallHeight) <= (mainWindow.innerWidth / mainWallSpec.mwNumGridColumns)) {
			innerDimension = mainWindow.innerHeight;
			gridDimension = wallHeight;
		}
		else {
			innerDimension = mainWindow.innerWidth;
			gridDimension = mainWallSpec.mwNumGridColumns;
		}

		const percent = innerDimension / 100;
		let fontSize = 0;
		let reducingInnerDimension = innerDimension + 1;
		do {
			reducingInnerDimension = reducingInnerDimension - 1;
			fontSize = Math.trunc((reducingInnerDimension / gridDimension) * mainWindow.devicePixelRatio) / mainWindow.devicePixelRatio;
			console.log('mw fontSize', fontSize);
		} while ((innerDimension - (fontSize * gridDimension)) < (2 * percent));
		console.log('mw final fontSize', fontSize);
		this.wallRef.style.fontSize = `${fontSize}px`;
		this.fontSize = fontSize;

		this.height = this.fontSize * wallHeight
		const spareHeight = mainWindow.innerHeight - this.height;
		//const spareHeight = mainWindow.innerHeight - (this.fontSize * wallHeight);
		console.log('mw spareHeight', spareHeight);
		const deviceSpareHeight = spareHeight * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareHeight', deviceSpareHeight);
		const roundedDeviceSpareHeight = Math.trunc(deviceSpareHeight / 2) * 2;
		console.log('mw roundedDeviceSpareHeight', roundedDeviceSpareHeight);
		const roundedSpareHeight = roundedDeviceSpareHeight / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareHeight', roundedSpareHeight);
		this.topPosition = roundedSpareHeight / 2;
		this.wallRef.style.top = `${this.topPosition}px`;

		this.width = this.fontSize * mainWallSpec.mwNumGridColumns
		const spareWidth = mainWindow.innerWidth - this.width;
		console.log('mw spareWidth', spareWidth);
		const deviceSpareWidth = spareWidth * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareWidth', deviceSpareWidth);
		const roundedDeviceSpareWidth = Math.trunc(deviceSpareWidth / 2) * 2;
		console.log('mw roundedDeviceSpareWidth', roundedDeviceSpareWidth);
		const roundedSpareWidth = roundedDeviceSpareWidth / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareWidth', roundedSpareWidth);
		this.leftPosition = roundedSpareWidth / 2;
		this.wallRef.style.left = `${this.leftPosition}px`;
	}

	show() {
		this.wallRef.style.display = `grid`;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
		for (let ref of this.dispenserRefsInUse) {
			ref.style.display = 'none'
		}
		
		const panelStyle = this.panelRef.style.cssText;
		const regExpDispensers = new RegExp(this.frPanelDispensers);
		const unspecifiedPanelStyle = panelStyle.replace(regExpDispensers, '999');
		//console.log(unspecifiedPanelStyle);
		this.panelRef.style.cssText = unspecifiedPanelStyle;
		
		const doorStyle = this.doorRef.style.cssText;
		const regExpPanel = new RegExp(this.frDoorPanel);
		const unspecifiedDoorStyle = doorStyle.replace(regExpPanel, '999');
		//console.log(unspecifiedDoorStyle);
		this.doorRef.style.cssText = unspecifiedDoorStyle;
		
		const wallStyle = this.wallRef.style.cssText;
		const regExpWall = new RegExp(this.frWallDoor);
		const unspecifiedWallStyle = wallStyle.replace(regExpWall, '999');
		//console.log(unspecifiedWallStyle);
		this.wallRef.style.cssText = unspecifiedWallStyle;
	}
}


/* -------- Info Wall -------- */

function backOnClick() {
	//console.log("backOnClick called");
	infoWall.hide();
	//disableScrolling();
	mainWall.show();
	disableScrolling();
	}

function demonstrationOnClick () {
	//console.log("demonstrationOnClick called");
	demo.enter();
	}

class InfoWall {
	constructor(topPosition, leftPosition, fontSize, punterPuzzle) {
		this.wallRef = document.querySelector("#infoWall");

		this.wallRef.style.top = `${topPosition}px`;
		this.wallRef.style.left = `${leftPosition}px`;
		this.wallRef.style.fontSize = `${fontSize}px`;

		const puzzleDataRef = document.querySelector("#iwPuzzleData");
		puzzleDataRef.innerHTML = "<strong>Puzzle " + String(punterPuzzle.number) + "&emsp;&boxh;&emsp;published on " + punterPuzzle.publishedOn + "</strong>";
		//puzzleDataRef.innerHTML = "<strong>Puzzle #" + String(punterPuzzleSpec.number) + "&emsp;&boxh;&emsp;Solve by " + punterPuzzleSpec.solveBy + "</strong>";

		this.separator2Ref = document.querySelector("#iwSeparator-2");
		this.separator2TopPosition = undefined;

		this.controlBack = new Control("#iwCtrlBack", backOnClick);
		this.controlBack.enable();
		this.controlBack.unfade();		
		this.controlDemo = new Control("#iwdCtrlDemonstration", demonstrationOnClick);
		this.controlDemo.enable();
		this.controlDemo.unfade();
	}
	
	show() {
		this.wallRef.style.display = `grid`;
		const separator2Rect = this.separator2Ref.getBoundingClientRect();
		//console.log(separator2Rect);
		this.separator2TopPosition = separator2Rect.top;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
		this.wallRef.style.display = `none`;
		this.controlDemo.deconstruct();
		this.controlBack.deconstruct();
	}
}


/* -------- Cross/Tick -------- */

function crossTickFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashCrossTick(crossTickRef, solveBiz) {
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	crossTickFlashed(solveBiz)
}

class CrossTick {
	constructor(crossTickId) {
		this.ref = document.querySelector(crossTickId);
	}
	
	showTick(solveBiz) {
		this.ref.innerHTML = "<strong>&check;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	showCross(solveBiz) {
		this.ref.innerHTML = "<strong>&cross;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	hide() {
		this.ref.style.display = `none`;
	}
	
	deconstruct() {
		this.ref.style.display = `none`;
	}
}


/* -------- Symbols -------- */

class Symbol {
	static getSymbolType(symbol) {
		const symbolTypeLookUp = {
			"0":"T0",
			"1":"T1",
			"2":"T1",
			"3":"T1",
			"4":"T1",
			"5":"T1",
			"6":"T1",
			"7":"T1",
			"8":"T1",
			"9":"T1",
			"+":"T+",
			"-":"T-",
			"*":"T*",
			"/":"T/",
			"a":"Tf",
			"b":"Tf",
			"c":"Tf",
			"d":"Tf",
			"e":"Tf",
			"f":"Tf",
			"g":"Tf",
			"h":"Tf",
			"i":"Tf",
			"j":"Tf",
			"k":"Tf",
			"l":"Tf",
			"m":"Tf",
			"n":"Tf",
			"o":"Tf"
		};
		return symbolTypeLookUp[symbol];
	}
	
	static getHTMLSymbolCode(symbol) {
		const symbolCodeLookUp = {
			"0":"0",
			"1":"1",
			"2":"2",
			"3":"3",
			"4":"4",
			"5":"5",
			"6":"6",
			"7":"7",
			"8":"8",
			"9":"9",
			"+":"&plus;",
			"-":"&minus;",
			"*":"&times;",
			"/":"&divide;",
			"a":"&frac12;",
			"b":"&frac13;",
			"c":"&frac14;",
			"d":"&frac15;",
			"e":"&frac16;",
			"f":"&frac18;",
			"g":"&frac23;",
			"h":"&frac25;",
			"i":"&frac34;",
			"j":"&frac35;",
			//"k":'<span class="Fraction">&frac38;</span>',
			"k":"&frac38;",
			"l":"&frac45;",
			"m":"&frac56;",
			"n":"&frac58;",
			"o":"&frac78;"
		};
		return symbolCodeLookUp[symbol]
	}

	static getHTMLSpaceCode(symbol1, symbol2, symbol3) {
		const coarseTypeLookUp = {
			"":"",
			"0":"Td",
			"1":"Td",
			"2":"Td",
			"3":"Td",
			"4":"Td",
			"5":"Td",
			"6":"Td",
			"7":"Td",
			"8":"Td",
			"9":"Td",
			"+":"T+",
			"-":"T-",
			"*":"T*/",
			"/":"T*/",
			"a":"Td",
			"b":"Td",
			"c":"Td",
			"d":"Td",
			"e":"Td",
			"f":"Td",
			"g":"Td",
			"h":"Td",
			"i":"Td",
			"j":"Td",
			"k":"Td",
			"l":"Td",
			"m":"Td",
			"n":"Td",
			"o":"Td"
		};
		
		const thinSpaceSequences = ["TdT+", "TdT-", "TdTdT+", "TdTdT-", "T+TdT+", "T+TdT-", "T-TdT+", "T-TdT-", "T*/TdT+", "T*/TdT-", "TdT+Td", "TdT-Td"];
		const veryThinSpaceSequences = ["TdT*/", "TdTdT*/", "T+TdT*/", "T-TdT*/", "T*/TdT*/", "TdT*/Td", "TdT*/T-"];

		const type1 = coarseTypeLookUp[symbol1];
		const type2 = coarseTypeLookUp[symbol2];
		const type3 = coarseTypeLookUp[symbol3];
		const type123 = type1 + type2 + type3;
		
		if (thinSpaceSequences.includes(type123))
			return "&thinsp;";
		else if (veryThinSpaceSequences.includes(type123))
			return "&VeryThinSpace;";
		else
			return "";
	}
}


/* -------- Items -------- */
/*
class Item {
	constructor(dispenser, symbol) {
		this.dispenser = dispenser;
		this.symbol = symbol;
	}
}
*/

/* -------- Dispensers -------- */

class DispenserItem {
	constructor(dispenser, symbol) {
		this.dispenser = dispenser;
		this.symbol = symbol;
	}
	
	deconstruct() {
	}
}

class Dispenser {
	constructor(symbolSequence, itemIdRoot) {		
		this.itemQueue = [];
		for (let i = 0; i < symbolSequence.length; i++) {
			const item = new DispenserItem(this, symbolSequence[i]);
			this.itemQueue.unshift(item);
		}

		this.itemRefs = [];
		for (let i = 1; i <= symbolSequence.length; i++) {
			const itemId = itemIdRoot + String(i);
			const itemRef = document.querySelector(itemId);
			this.itemRefs.push(itemRef);
		}
		
		this.container = [];
		for (let t = 0; t < this.itemQueue.length; t++) this.container[t] = this.itemQueue[t];
				
		this.numItemsInContainer = this.itemQueue.length;
	}

	refresh() {
		for (let t = 0; t < this.container.length; t++) {
			if (this.container[t] == null) {
				this.itemRefs[t].style.display = `none`;
			}
			else {
				this.itemRefs[t].style.display = `block`;
				this.itemRefs[t].innerHTML = "<code><strong>" + Symbol.getHTMLSymbolCode(this.container[t].symbol) + "</strong></code>";
			}
		}
	}
	
	reset() {	
		this.container = [];
		for (let i = 0; i < this.itemQueue.length; i++) this.container[i] = this.itemQueue[i];
		this.numItemsInContainer = this.itemQueue.length;
	}
	
	peekAtItem() {
		return this.container[0];
	}
	
	takeItem() {
		const item = this.container.shift();
		this.container.push(null);
		this.numItemsInContainer--;
		return item;
	}
	
	replaceItem() {
		this.container.pop();
		const item = this.itemQueue[this.itemQueue.length - this.numItemsInContainer - 1];
		this.container.unshift(item);
		this.numItemsInContainer++;		
	}

	deconstruct() {
		for (let item of this.itemQueue) {
			item.deconstruct();
		}
	}
}


/* -------- Expression -------- */

function hintFlashed(solveBiz) {solveBiz.completeHintClicked()}

async function flashHint(solveBiz, script) {
	await wait(500);
	const waitTimes = [1500, 500];
	for (let i = 0; i <= 1; i++) {
		for (let command of script) {
			if (command.ref != null) command.ref.innerHTML = command.html;
			if (command.pause != 0) await wait(command.pause);		
		}
		await wait(waitTimes[i]);
	}
	hintFlashed(solveBiz)
}

class Expression {
	constructor(expressionIdRoot, puzzle) {
		this.puzzle = puzzle;
		this.backgroundRef = document.querySelector(expressionIdRoot + "Background-" + String(puzzle.solutionExpression.length));
		this.backgroundRef.style.display = `block`;
		this.foregroundRef = document.querySelector(expressionIdRoot + "Foreground-" + String(puzzle.solutionExpression.length));
		this.foregroundRef.style.display = `block`;
		this.overstrikeRef = document.querySelector(expressionIdRoot + "Overstrike-" + String(puzzle.solutionExpression.length));
		this.overstrikeRef.style.display = `block`;
		this.overstrikeRef.innerHTML = "&InvisibleTimes;";
		this.items = [];
		this.invalidFirstOnes = ["T+", "T*", "T/"];
		this.invalidFirstTwos = 
			["T0T0", "T0T1", "T0Tf", "TfT0", "TfT1", "TfTf", "T-T+", "T-T-", "T-T*", "T-T/"];
		this.invalidTwos = ["TfT0", "TfT1", "TfTf", "T+T+", "T+T-", "T+T*", "T+T/", "T-T+", "T-T-", "T-T*", "T-T/", "T*T+", "T/T+", "T*T*", "T*T/", "T/T*", "T/T/","T/T0"];
		this.invalidThrees = ["T+T0T0", "T+T0T1", "T+T0Tf", "T-T0T0", "T-T0T1", "T-T0Tf", "T*T0T0", "T*T0T1", "T*T0Tf"];
		this.invalidLastOnes = ["T+", "T-", "T*", "T/"];
	}
	
	reset() {
		this.items = [];
	}

	getLength() {
		return this.items.length;
	}
	
	getExpression() {
		let expression = "";
		for (let item of this.items) {
			expression = expression + item.symbol;
		}
		return expression;
	}

	isAddItemValid(item) {
		const itemType = Symbol.getSymbolType(item.symbol);
		let expression = "";
		for (let i of this.items) {
			expression = expression + i.symbol;
		}
		if (expression.length == 0)
			return !this.invalidFirstOnes.includes(itemType);
		else if (expression.length == 1) {
			const type1 = Symbol.getSymbolType(expression.charAt(0));
			return !this.invalidFirstTwos.includes(type1 + itemType);
		}
		else if (expression.length >= 2) {
			const type2 = Symbol.getSymbolType(expression.charAt(expression.length - 1));
			if (this.invalidTwos.includes(type2 + itemType))
				return false;
			else {
				const type1 = Symbol.getSymbolType(expression.charAt(expression.length - 2));
				if (this.invalidThrees.includes(type1 + type2 + itemType))
					return false;
				else if (expression.length == this.puzzle.solutionExpression.length - 1)
					return !this.invalidLastOnes.includes(itemType);
				else return true;
			}
		}
	}
	
	addItem(item) {
		this.items.push(item);
	}
	
	removeItem() {
		return this.items.pop();
	}

	refresh() {
		const numItems = this.items.length;
		let spaceCode = undefined;
		let symbolCode = undefined;
		let html = "";
		if (numItems > 0) {
			html = "&thinsp;<code><strong>" + Symbol.getHTMLSymbolCode(this.items[0].symbol) + "</strong></code>";
			if (numItems > 1) {
				spaceCode = Symbol.getHTMLSpaceCode("", this.items[0].symbol, this.items[1].symbol);
				symbolCode = Symbol.getHTMLSymbolCode(this.items[1].symbol);
				html = html + spaceCode + "<code><strong>" + symbolCode + "</strong></code>";
				if (numItems > 2) {
					for (let i = 2; i < numItems; i++) {
						const spaceCode = Symbol.getHTMLSpaceCode(this.items[i - 2].symbol, this.items[i - 1].symbol, this.items[i].symbol);
						const symbolCode = Symbol.getHTMLSymbolCode(this.items[i].symbol);
						html = html + spaceCode + "<code><strong>" + symbolCode + "</strong></code>";					
					}
				}
			}
		}
		//console.log(html);
		if (html.length == 0) html = "&InvisibleTimes;";
		this.foregroundRef.innerHTML = html;
	}
	
	flashHint(solveBiz) {
		let script = [];
		let dotHTML = "";
		if (this.puzzle.hintSpec.numDots != 0) {
			for (let i = 0; i < this.puzzle.hintSpec.numDots; i++) {
				dotHTML = dotHTML + "&bull;";
				const command = {ref: this.foregroundRef, html: "<code>" + dotHTML + "</code>", pause: 1000};
				script.push(command);
			}
			dotHTML = "<code>" + dotHTML + "</code>";
		}
		//const symbolHTML = dotHTML + "<code><strong>" + this.puzzle.hintSpec.symbol + "</strong></code>";
		const symbolHTML = dotHTML + "<code><strong>" + Symbol.getHTMLSymbolCode(this.puzzle.hintSpec.symbol) + "</strong></code>";
		if (this.puzzle.hintSpec.isHere) {
			script.push({ref: this.foregroundRef, html: symbolHTML, pause: 1500});
		}
		else {
			script.push({ref: this.foregroundRef, html: symbolHTML, pause: 0});
			let spaceHTML = "";
			for (let i = 0; i < this.puzzle.hintSpec.numDots; i++) {
				spaceHTML = spaceHTML + "&nbsp;";
			}
			const symbolNotHereHTML = "<code>" + spaceHTML + '<strong><span style="color:#D00000;">\\</span></strong></code>';
			script.push({ref: this.overstrikeRef, html: symbolNotHereHTML, pause: 1500});
		}
		script.push({ref: this.foregroundRef, html: "&InvisibleTimes;", pause: 0});
		script.push({ref: this.overstrikeRef, html: "&InvisibleTimes;", pause: 0});
		flashHint(solveBiz, script);
	}
	
	deconstruct() {
		this.overstrikeRef.style.display = `none`;
		this.foregroundRef.style.display = `none`;
		this.backgroundRef.style.display = `none`;
	}
}


/* -------- Target -------- */

class Target {
	constructor(targetIdRoot, puzzle) {
		this.backgroundRef = document.querySelector(targetIdRoot + "Background-" + String(puzzle.targetSpec.length));
		this.backgroundRef.style.display = `block`;
		this.foregroundRef = document.querySelector(targetIdRoot + "Foreground-" + String(puzzle.targetSpec.length));
		this.foregroundRef.style.display = `block`;
		const decimalPointAdjustment = puzzle.targetSpec.replace(".", "</code>.<code>");
		this.foregroundRef.innerHTML = "<strong><code>" + decimalPointAdjustment + "</code></strong>";
	}
	
	deconstruct() {
		this.foregroundRef.style.display = `none`;
		this.backgroundRef.style.display = `none`;
	}
}


/* -------- Controls -------- */

class Control {
	constructor(id, onClick) {
	this.id = id;
	this.onClick = onClick;
	this.ref = document.querySelector(id);
	this.isEnabled = false;
	this.isFrozen = false;
	this.wasEnabledBeforeFreeze = undefined;
	}

	enable() {
		if (this.isFrozen) return;
		if (!this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
			this.isEnabled = true;
		}
	}
	
	disable() {
		if (this.isFrozen) return;
		if (this.isEnabled) {
			if (this.OnClick !== null) {
				this.ref.removeEventListener("click", this.onClick);
			}
			this.isEnabled = false;
		}
	}

	fade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `0.5`;
	}
	
	unfade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `1.0`;
	}
	
	freeze() {
		if (this.isFrozen) return;
		this.wasEnabledBeforeFreeze = this.isEnabled;
		if (this.isEnabled) {
			this.ref.removeEventListener("click", this.onClick);
			this.isEnabled = false;
		}
		this.isFrozen = true;
	}
	
	unfreeze() {
		this.isEnabled = this.wasEnabledBeforeFreeze;
		if (this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
		}
		this.isFrozen = false;
	}
	
	deconstruct() {
		this.ref.removeEventListener("click", this.onClick);
	}
}

function dispenseControlFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashDispenseControl(ref, flasherRef, solveBiz) {
	ref.style.display = `none`;
	await wait(300);
	flasherRef.style.display = `block`;
	await wait(300);
	flasherRef.style.display = `none`;
	await wait(300);
	flasherRef.style.display = `block`;
	await wait(300);
	flasherRef.style.display = `none`;
	ref.style.display = `block`;
	dispenseControlFlashed(solveBiz)
}

class DispenseControl extends Control {
	constructor(id, onClick) {
		super(id, onClick);
		this.ref.style.display = `block`;
		this.flasherRef = document.querySelector(id + "Flasher");
		this.flasherRef.style.display = `none`;
	}
	
	flash(solveBiz) {
		flashDispenseControl(this.ref, this.flasherRef, solveBiz);		
	}

	deconstruct() {
		//console.log("DispenseControl.deconstruct called");
		//this.ref.removeEventListener("click", this.onClick);
		super.deconstruct();
		this.ref.style.display = `none`;
		this.flasherRef.style.display = `none`;
	}
}


/* -------- Solve -------- */

class SolveIO {
	constructor(controls, crossTick) {
	//controls
	//an array of Control objects indexed by these names:
	//"Information", "Hint", "Solution", "Reset", "Undispense", "Dispense1", "Dispense2", "Dispense3", "Dispense4", "Dispense5"
	this.controls = controls;
	this.crossTick = crossTick;
	}

	disableAllControls() {
		for (let name in this.controls) {
			this.controls[name].disable();
			this.controls[name].fade();
		}
	}

	disableControls(controls) {
		for (let i in controls) {
			this.controls[controls[i]].disable();
			this.controls[controls[i]].fade();
		}
	}
	
	enableAllControls() {
		for (let name in this.controls) {
			this.controls[name].enable();
			this.controls[name].unfade();
		}
	}

	enableControls(controls) {
		for (let i in controls) {
			this.controls[controls[i]].enable();
			this.controls[controls[i]].unfade();
		}
	}
	
	enableAllControlsExcept(exceptions) {
		for (let name in this.controls) {
			if (!exceptions.includes(name)) {
				this.controls[name].enable();
				this.controls[name].unfade();
			}
			else {
				this.controls[name].disable();
				this.controls[name].fade();
			}
		}
	}
	
	freezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].freeze();
		}
	}
	
	unfreezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].unfreeze();
		}
	}

	flashDispenseControl(name, solveBiz) {
		this.controls[name].flash(solveBiz);
	}
		
	hideCrossTick() {
		this.crossTick.hide();
	}
	
	showTick(solveBiz) {
		this.crossTick.showTick(solveBiz);
	}
	
	showCross(solveBiz) {
		this.crossTick.showCross(solveBiz);
	}
	
	deconstruct() {
	}
}

class SolveBiz {	
	constructor(puzzle, dispensers, expression, io) {
		this.puzzle = puzzle;
		this.dispensers = dispensers;
		this.expression = expression;
		this.io = io;
				
		for (let i = 1; i <= puzzle.numDispensers; i++) this.dispensers[i].refresh();

		this.expression.refresh();
		
		this.hintNumShows = 3;
		this.hintNumShowsRemaining = undefined;
		this.hintShowing = undefined;

		this.solutionNextIndex = undefined;
		
		this.callbackResolve = undefined;

		this.sleep();
	}
	
	sleep() {
		this.io.disableAllControls();
	}
	
	wake() {
		this.io.enableAllControlsExcept(["Reset", "Undispense"]);
	}
	
	freeze() {
		this.io.freezeAllControls();
	}
	
	unfreeze() {
		this.io.unfreezeAllControls();
	}
		
	reset() {
		this.expression.reset();
		this.expression.refresh();
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			const dispenser = this.dispensers[i];
			dispenser.reset();
			dispenser.refresh();
		}
		this.io.hideCrossTick();
	}

	updateDispenseControls() {
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			if (this.dispensers[i].numItemsInContainer == 0) {
				this.io.disableControls(["Dispense" + String(i)]);
			}
			else {
				this.io.enableControls(["Dispense" + String(i)]);
			}
		}
	}

	review() {
		this.updateDispenseControls();
		if (this.expression.getLength() == 0) {
			this.io.disableControls(["Reset", "Undispense"]);
		}
		else {
			this.io.enableControls(["Reset", "Undispense"]);
		}
		let numEmptyDispensers = 0;
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			if (this.dispensers[i].numItemsInContainer == 0) numEmptyDispensers++;
		}
		if (numEmptyDispensers == this.puzzle.numDispensers) {
			const thisSolution = this.expression.getExpression();
			const correctSolution = this.puzzle.solutionExpression;
			if (thisSolution === correctSolution) {
				this.io.disableControls(["Undispense"]);
				this.freeze();
				this.io.showTick(this);
			}
			else {
				this.freeze();
				this.io.showCross(this);
			}
		}
		else {
			this.io.hideCrossTick();
		}
	}

	resetClicked() {
		this.reset();
		this.io.enableAllControlsExcept(["Reset", "Undispense"]);
	}
	
	dispenseClicked(dispenserNum) {
		const dispenser = this.dispensers[dispenserNum];
		const item = dispenser.peekAtItem();
		if (this.expression.isAddItemValid(item)) {
			const itemTaken = dispenser.takeItem();
			this.expression.addItem(itemTaken);
			dispenser.refresh();
			this.expression.refresh();
			this.review();
		}
		else {
			this.io.flashDispenseControl("Dispense" + String(dispenserNum), this);
		}
	}

	undispenseClicked() {
		const itemRemoved = this.expression.removeItem();
		const dispenser = itemRemoved.dispenser;
		dispenser.replaceItem();
		this.expression.refresh();
		dispenser.refresh();
		this.review();
	}

	hintTimerExpired() {
		this.expression.flashHint(this);
	}

	hintClicked() {
		this.callbackResolve = null;
		this.io.disableAllControls();
		this.io.hideCrossTick();
		if (this.expression.getLength() == 0) {
			this.expression.flashHint(this);
		}
		else {
			this.reset();
			setTimeout(punterHintTimerExpired, 250);			
		}
	}

	completeHintClicked() {
		this.io.enableAllControlsExcept(["Reset", "Undispense"]);
		if (this.callbackResolve != null) this.callbackResolve();
	}

	hintWithCallback() {
		return new 	Promise((resolve, reject) => {
								this.io.disableAllControls();
								this.callbackResolve = resolve;
								this.expression.flashHint(this);
							}
					);
	}
	
	solutionShowItem(dispenser) {
		const itemTaken = dispenser.takeItem();
		this.expression.addItem(itemTaken);
		dispenser.refresh();
		this.expression.refresh();
	}

	solutionTimerExpired() {
		const dispenserNum = this.puzzle.solutionDispenseSequence[this.solutionNextIndex];
		const dispenser = this.dispensers[dispenserNum];
		this.solutionShowItem(dispenser);
		this.solutionNextIndex++;
		if (this.solutionNextIndex == this.puzzle.solutionDispenseSequence.length) {
			this.io.enableControls(["Information", "Reset"]);
			return;
		}
		setTimeout(punterSolutionTimerExpired, 1000);
	}

	solutionClicked() {
		this.io.disableAllControls();
		this.io.hideCrossTick();
		this.solutionNextIndex = 0;
		if (this.expression.getLength() == 0) {
			setTimeout(punterSolutionTimerExpired, 500);
		}
		else {
			this.reset();
			setTimeout(punterSolutionTimerExpired, 750);
		}
	}

	solutionWithCallbackTimerExpired() {
		const dispenser = this.dispensers[this.puzzle.solutionDispenseSequence[this.solutionNextIndex]];
		this.solutionShowItem(dispenser);
		this.solutionNextIndex++;
		if (this.solutionNextIndex == this.puzzle.solutionDispenseSequence.length) {
			this.io.enableControls(["Reset"]);
			this.callbackResolve();
			return;
		}
		setTimeout(demoSolutionTimerExpired, 1000);
	}

	solutionWithCallback() {
		return new 	Promise((resolve, reject) => {
								this.io.disableAllControls();
								this.callbackResolve = resolve;
								this.solutionShowItem(this.dispensers[this.puzzle.solutionDispenseSequence[0]]);
								this.solutionNextIndex = 1;
								setTimeout(demoSolutionTimerExpired, 1000);
							}
					);
	}
	
	deconstruct() {
	}	
}


/* -------- Punter -------- */

function punterInformationOnClick() {
	//console.log("informationOnClick called");
	mainWall.hide();
	infoWall.show();
	enableScrolling();
}

function punterUndispenseOnClick() {punter.solveBiz.undispenseClicked();};
function punterResetOnClick() {punter.solveBiz.resetClicked();};
function punterHintOnClick() {punter.solveBiz.hintClicked();};
function punterHintTimerExpired() {punter.solveBiz.hintTimerExpired();};
function punterSolutionOnClick() {punter.solveBiz.solutionClicked();};
function punterSolutionTimerExpired() {punter.solveBiz.solutionTimerExpired();};

let punterDispenseOnClicks = [undefined,
							  function() {punter.solveBiz.dispenseClicked(1)},
							  function() {punter.solveBiz.dispenseClicked(2)},
							  function() {punter.solveBiz.dispenseClicked(3)},
							  function() {punter.solveBiz.dispenseClicked(4)},
							  function() {punter.solveBiz.dispenseClicked(5)},
							 ];

class Punter {
	constructor(puzzle) {
		this.puzzle = puzzle;
		
		this.dispensers = [undefined];
		const itemIdRoot = "#mwdpdItem-" + String(puzzle.maxDispenserHeight) + String(puzzle.numDispensers) + "-";
		for (let i = 1; i <= puzzle.numDispensers; i++) {
			const itemIdRootPlus = itemIdRoot + String(i);
			this.dispensers[i] = new Dispenser(puzzle.dispenserFullSpec[i], itemIdRootPlus);
		}

		this.expression = new Expression("#mwdpExpression", puzzle);

		this.target = new Target("#mwdpTarget", puzzle);

		this.controls = [];
		this.controls["Information"] = new Control("#mwdCtrlInformation", punterInformationOnClick, null);
		this.controls["Hint"] = new Control("#mwdCtrlHint", punterHintOnClick, null);
		this.controls["Solution"] = new Control("#mwdCtrlSolution", punterSolutionOnClick, null);
		this.controls["Reset"] = new Control("#mwdCtrlReset", punterResetOnClick, null);
		this.controls["Undispense"] = new Control("#mwdCtrlUndispense", punterUndispenseOnClick);

		const dispenseIdRoot = "#mwdCtrlDispense-" + String(puzzle.numDispensers);
		for (let i = 1; i <= puzzle.numDispensers; i++) {
			const dispenseId = dispenseIdRoot + String(i);
			this.controls["Dispense" + String(i)] = new DispenseControl(dispenseId, punterDispenseOnClicks[i]);
		}

		this.crossTick = new CrossTick("#mwCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.solveBiz = new SolveBiz(puzzle, this.dispensers, this.expression, this.solveIO);
	}
	
	deconstruct() {
		//console.log("Punter.deconstruct called");
		this.solveBiz.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		
		//console.log(this.controls);		
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
		
		this.target.deconstruct();
		this.expression.deconstruct();

		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			this.dispensers[i].deconstruct();
		}
	}
}


/* -------- Demo -------- */

function demoHintTimerExpired() {demo.solveBiz.hintWithCallbackTimerExpired();};
function demoSolutionTimerExpired() {demo.solveBiz.solutionWithCallbackTimerExpired();}

class Demo {
	constructor() {
		const puzzleSpec = {
			dispenserSpec: [undefined, "61", "56", "-", "4*"],
			targetSpec: "28",
			hintSpec: {numDots: 2, symbol:"5", isHere: false},
			solutionExpression: "6*14-56",
			solutionDispenseSequence: [2, 4, 1, 4, 3, 2, 1]
		};
		this.puzzle = new Puzzle(puzzleSpec);

		this.dispensers = [undefined];
		const itemIdRoot = "#iwdpdItem-";
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			const itemIdRootPlus = itemIdRoot + String(i);
			this.dispensers[i] = new Dispenser(this.puzzle.dispenserFullSpec[i], itemIdRootPlus);
		}

		this.expression = new Expression("#iwdpExpression", this.puzzle);

		this.target = new Target("#iwdpTarget", this.puzzle);
		
		this.controls = [];
		this.controls["Information"] = new Control("#iwdCtrlInformation", null);
		this.controls["Hint"] = new Control("#iwdCtrlHint", null);
		this.controls["Solution"] = new Control("#iwdCtrlSolution", null);
		this.controls["Reset"] = new Control("#iwdCtrlReset", null);
		this.controls["Undispense"] = new Control("#iwdCtrlUndispense", null);
		this.controls["Dispense1"] = new Control("#iwdCtrlDispense-1", null);
		this.controls["Dispense2"] = new Control("#iwdCtrlDispense-2", null);
		this.controls["Dispense3"] = new Control("#iwdCtrlDispense-3", null);
		this.controls["Dispense4"] = new Control("#iwdCtrlDispense-4", null);

		this.crossTick = new CrossTick("#iwdCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.solveBiz = new SolveBiz(this.puzzle, this.dispensers, this.expression, this.solveIO);
	}
	
	enter() {
		infoWall.controlBack.disable();
		infoWall.controlBack.fade();
		infoWall.controlDemo.disable();
		infoWall.controlDemo.fade();
		
		infoWall.separator2Ref.scrollIntoView({behavior:"smooth"});
		
		demoExecuteScript();
	}
	
	exit() {
		infoWall.controlBack.enable();
		infoWall.controlBack.unfade();
		infoWall.controlDemo.enable();
		infoWall.controlDemo.unfade();
		
		window.scrollTo({top:0, left:0, behavior:"smooth"});
	}
	
	deconstruct() {
		this.solveBiz.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}

		this.target.deconstruct();
		this.expression.deconstruct();
		
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			this.dispensers[i].deconstruct();
		}
		
		this.puzzle.deconstruct();
	}
}

const demoScript = [
	"Dispense1",
	"Pause",
	"Dispense2",
	"Pause",
	"Dispense3",
	"Pause",		
	"Pause",		
	"Undispense",
	"Pause",		
	"Undispense",
	"Pause",		
	"Undispense",
	"Pause",		
	"Pause",		
	"Dispense2",
	"Pause",		
	"Dispense4",
	"Pause",		
	"Dispense1",
	"Pause",		
	"Dispense4",
	"Pause",		
	"Dispense3",
	"Pause",		
	"Dispense1",
	"Pause",		
	"Dispense2",
	"Pause",		
	"Pause",		
	"Pause",		
	"Pause",		
	"Undispense",
	"Pause",		
	"Undispense",
	"Pause",		
	"Dispense2",
	"Pause",		
	"Dispense1",
	"Pause",
	"Pause",
	"Pause",
	"Pause",
	"Reset",
	"Pause",
	"Pause",		
	"Hint",
	"Pause",
	"Pause",		
	"Solution"
];

function demoShowSpot(spotRef, opacity) {
	spotRef.style.display = `block`;
	spotRef.style.opacity = `${opacity}`;
	}
	
function demoHideSpot(spotRef) {
	spotRef.style.display = `none`;
	}

async function demoExecuteScript() {
	let spotRefLookUp = [];
	const iwdControls = ["Hint", "Solution", "Reset", "Undispense", "Dispense1", "Dispense2", "Dispense3", "Dispense4"]
	for (let control of iwdControls) spotRefLookUp[control] = document.querySelector("#iwdSpot" + control);
	for (let c = 1; c <= 4; c++) spotRefLookUp["Dispense" + String(c)] = document.querySelector("#iwdSpotDispense-" + String(c));
	
	const spotFadeSequence = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

	//waiting for smooth scroll to complete
	await wait(1000);
	disableScrolling();
	
	demo.solveBiz.wake();
	await wait(1000);
	for (let command of demoScript) {
		if (command === "Pause") {
			await wait(500);
			continue;
		}
		
		const control = command;
		const spotRef = spotRefLookUp[control];
		for (let opacity of spotFadeSequence) {
			demoShowSpot(spotRef, opacity);
			await wait(100);
		}
		
		switch(control) {
		case "Hint":
			await demo.solveBiz.hintWithCallback();
			break;
		case "Solution":
			await demo.solveBiz.solutionWithCallback();
			break;
		case "Reset":
			demo.solveBiz.resetClicked();
			break;
		case "Undispense":
			demo.solveBiz.undispenseClicked();
			break;
		case "Dispense1":
			demo.solveBiz.dispenseClicked(1);
			break;
		case "Dispense2":
			demo.solveBiz.dispenseClicked(2);
			break;
		case "Dispense3":
			demo.solveBiz.dispenseClicked(3);
			break;
		case "Dispense4":
			demo.solveBiz.dispenseClicked(4);
			break;
		}
		
		demoHideSpot(spotRef);
		await wait(1000);
	}
	
	await wait(1500);
	demo.solveBiz.reset();
	demo.solveBiz.sleep();	
	
	await wait(1000);
	enableScrolling();
	demo.exit();
}


/* -------- Configuration -------- */

let mainWall = undefined;
let punter = undefined;
let infoWall = undefined;
let demo = undefined;

function configure() {
	//const punterPuzzle = new Puzzle(punterPuzzleSpec);
	const punterPuzzle = new Puzzle(puzzleSpecs[0]);
	mainWall = new MainWall(mainWallSpec, punterPuzzle);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	demo = new Demo();	
}


function reconfigure(punterPuzzle) {
	demo.deconstruct();
	infoWall.deconstruct();
	punter.deconstruct();
	mainWall.deconstruct();
	
	mainWall = new MainWall(mainWallSpec, punterPuzzle);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	demo = new Demo();		
}


/* -------- Begin -------- */

const published = new Published();
configure();


/* -------- Preamble -------- */
/*
async function performPreamble() {
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	punter.solveBiz.unfreeze();
	disableScrolling();
}
*/
async function performPreamble() {
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;

	await wait(750);

	mainWall.hide();
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	//punter.solveBiz.unfreeze();
	punter.solveBiz.wake();
	disableScrolling();
}

infoWall.controlBack.freeze();
infoWall.controlDemo.freeze();
//punter.solveBiz.wake();
//punter.solveBiz.freeze();
performPreamble();


