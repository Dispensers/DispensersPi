let puzzleSpecs = [
/*
	{
		number: 19,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "1-", "/8", "91", "*2"],
		targetSpec: "5",
		hintSpec: {numDots: 8, symbol:"1", isHere: true},
		solutionExpression: "8/12*9-1",
		solutionDispenseSequence: [2, 2, 3, 4, 4, 3, 1, 1]
	},

	{
		number: 24,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "/6", "8", "+", "4", "0/2"],
		targetSpec: "8",
		hintSpec: {numDots: 8, symbol:"1", isHere: true},
		solutionExpression: "2/4+60/8",
		solutionDispenseSequence: [5, 5, 4, 3, 1, 5, 1, 2]
	},

	{
		number: 20,
		publishedOn: "dd Mmm 24",
		dispenserSpec: [undefined, "*2", "54", "8", "7/"],
		targetSpec: "6",
		hintSpec: {numDots: 8, symbol:"1", isHere: true},
		solutionExpression: "4/52*78",
		solutionDispenseSequence: [2, 4, 2, 1, 1, 4, 3]
	},
*/
	{
		number: 18,
		publishedOn: "18 Jun 24",
		dispenserSpec: [undefined, "4*71", "-3", "56"],
		targetSpec: "88",
		hintSpec: {numDots: 4, symbol:"5", isHere: true},
		solutionExpression: "316-57*4",
		solutionDispenseSequence: [2, 1, 3, 2, 3, 1, 1, 1]
	},
	{
		number: 21,
		publishedOn: "6 Jun 24",
		dispenserSpec: [undefined, "88/", "2", "*61", "4"],
		targetSpec: "21",
		hintSpec: {numDots: 5, symbol:"8", isHere: true},
		solutionExpression: "126/48*8",
		solutionDispenseSequence: [3, 2, 3, 1, 4, 1, 3, 1]
	},

/* =============================================================== */

	{
		number: 16,
		publishedOn: "20 Mar 24",
		dispenserSpec: [undefined, "5-1", "159", "-19"],
		targetSpec: "-37",
		hintSpec: {numDots: 8, symbol:"1", isHere: true},
		solutionExpression: "915-951-1",
		solutionDispenseSequence: [2, 1, 2, 1, 3, 1, 3, 3, 2]
	},
	{
		number: 22,
		publishedOn: "13 Mar 24",
		dispenserSpec: [undefined, "1", "2+", "3", "4-", "5"],
		targetSpec: "-28",
		hintSpec: {numDots: 5, symbol:"2", isHere: true},
		solutionExpression: "1-53+24",
		solutionDispenseSequence: [1, 4, 5, 3, 2, 2, 4]
	},
	{
		number: 14,
		publishedOn: "6 Mar 24",
		dispenserSpec: [undefined, "/61", "7", "91-8"],
		targetSpec: "53",
		hintSpec: {numDots: 3, symbol:"1", isHere: true},
		solutionExpression: "81-196/7",
		solutionDispenseSequence: [3, 1, 3, 3, 3, 1, 1, 2]
	},
	{
		number: 17,
		publishedOn: "28 Feb 24",
		dispenserSpec: [undefined, "20", "/", "+8", "46"],
		targetSpec: "4.15",
		hintSpec: {numDots: 3, symbol:"2", isHere: false},
		solutionExpression: "86/40+2",
		solutionDispenseSequence: [3, 4, 2, 4, 1, 3, 1]
	},
	{
		number: 23,
		publishedOn: "21 Feb 24",
		dispenserSpec: [undefined, "13", "5", "79", "-", "*"],
		targetSpec: "318",
		hintSpec: {numDots: 0, symbol:"5", isHere: false},
		solutionExpression: "9*37-15",
		solutionDispenseSequence: [3, 5, 1, 3, 4, 1, 2]
	},
	{
		number: 13,
		publishedOn: "14 Feb 24",
		dispenserSpec: [undefined, "333", "+", "-", "21"],
		targetSpec: "-5",
		hintSpec: {numDots: 1, symbol:"3", isHere: false},
		solutionExpression: "3-31+23",
		solutionDispenseSequence: [1, 3, 1, 4, 2, 4, 1]
	},
	{
		number: 15,
		publishedOn: "7 Feb 24",
		dispenserSpec: [undefined, "-1", "4*1", "71"],
		targetSpec: "147",
		hintSpec: {numDots: 3, symbol:"7", isHere: false},
		solutionExpression: "11*14-7",
		solutionDispenseSequence: [1, 2, 2, 3, 2, 1, 3]
	},
	{
		number: 12,
		publishedOn: "31 Jan 24",
		dispenserSpec: [undefined, "26", "4*", "/05"],
		targetSpec: "200",
		hintSpec: {numDots: 3, symbol:"0", isHere: false},
		solutionExpression: "50/6*24",
		solutionDispenseSequence: [3, 3, 3, 1, 2, 1, 2]
	},
	{
		number: 11,
		publishedOn: "10 Nov 22",
		dispenserSpec: [undefined, "7-9", "51", "7*"],
		targetSpec: "4",
		hintSpec: {numDots: 3, symbol:"7", isHere: false},
		solutionExpression: "1*79-75",
		solutionDispenseSequence: [2, 3, 3, 1, 1, 1, 2]
	},
	{
		number: 10,
		publishedOn: "3 Nov 22",
		dispenserSpec: [undefined, "/6", "/4", "24", "7"],
		targetSpec: "16.5",
		hintSpec: {numDots: 2, symbol:"/", isHere: false},
		solutionExpression: "462/4/7",
		solutionDispenseSequence: [3, 1, 3, 1, 2, 2, 4]
	},
	{
		number: 9,
		publishedOn: "27 Oct 22",
		dispenserSpec: [undefined, "8569", "*", "+", "0"],
		targetSpec: "3057",
		hintSpec: {numDots: 3, symbol:"0", isHere: false},
		solutionExpression: "9+6*508",
		solutionDispenseSequence: [1, 3, 1, 2, 1, 4, 1]
	},
	{
		number: 8,
		publishedOn: "20 Oct 22",
		dispenserSpec: [undefined, "3*", "321", "*2"],
		targetSpec: "598",
		hintSpec: {numDots: 3, symbol:"2", isHere: false},
		solutionExpression: "2*13*23",
		solutionDispenseSequence: [3, 1, 2, 1, 3, 2, 2]
	},
	{
		number: 7,
		publishedOn: "13 Oct 22",
		dispenserSpec: [undefined, "1+", "/", "253", "4"],
		targetSpec: "7.5",
		hintSpec: {numDots: 4, symbol:"/", isHere: true},
		solutionExpression: "3+54/12",
		solutionDispenseSequence: [3, 1, 3, 4, 2, 1, 3]
	},
	{
		number: 6,
		publishedOn: "6 Oct 22",
		dispenserSpec: [undefined, "-", "49", "61", "72"],
		targetSpec: "-119",
		hintSpec: {numDots: 2, symbol:"9", isHere: false},
		solutionExpression: "297-416",
		solutionDispenseSequence: [4, 2, 4, 1, 2, 3, 3]
	},
	{
		number: 5,
		publishedOn: "29 Sep 22",
		dispenserSpec: [undefined, "6*", "-7", "+8", "9"],
		targetSpec: "-32",
		hintSpec: {numDots: 5, symbol:"+", isHere: true},
		solutionExpression: "7-8*6+9",
		solutionDispenseSequence: [2, 2, 3, 1, 1, 3, 4]
	},
	{
		number: 4,
		publishedOn: "22 Sep 22",
		dispenserSpec: [undefined, "38", "3-8", "+3"],
		targetSpec: "48",
		hintSpec: {numDots: 3, symbol:"3", isHere: true},
		solutionExpression: "83-38+3",
		solutionDispenseSequence: [2, 3, 2, 2, 1, 3, 1]
	},
	{
		number: 3,
		publishedOn: "15 Sep 22",
		dispenserSpec: [undefined, "/01", "552", "*"],
		targetSpec: "275",
		hintSpec: {numDots: 1, symbol:"*", isHere: false},
		solutionExpression: "10/2*55",
		solutionDispenseSequence: [1, 1, 1, 2, 3, 2, 2]
	},
	{
		number: 2,
		publishedOn: "8 Sep 22",
		dispenserSpec: [undefined, "427-6", "/2"],
		targetSpec: "3",
		hintSpec: {numDots: 3, symbol:"2", isHere: true},
		solutionExpression: "6-72/24",
		solutionDispenseSequence: [1, 1, 1, 2, 2, 1, 1]
	},
	{
		number: 1,
		publishedOn: "31 Aug 22",
		dispenserSpec: [undefined, "4-9", "7+62"],
		targetSpec: "30",
		hintSpec: {numDots: 3, symbol:"4", isHere: false},
		solutionExpression: "9-26+47",
		solutionDispenseSequence: [1, 1, 2, 2, 2, 1, 2]
	},
	{
		number: 0,
		publishedOn: "31 Aug 22",
		dispenserSpec: [undefined, "5*", "80", "3", "-1"],
		targetSpec: "63",
		hintSpec: {numDots: 4, symbol:"8", isHere: true},
		solutionExpression: "103-8*5",
		solutionDispenseSequence: [4, 2, 3, 4, 2, 1, 1]
	}
];

