let template = {
    move: "",
    alias: null,
    precursor: null,
    imgSrc: "./AF-move-images/placeholder.png",  
    level: "",
    callout: {
        keyPhrase: null,
        direction: "",
        command: "",
    },  
    nextMoves: []
}
/*move is the full callout (ex: "left leg scorpion reach");
alias is another move that's effectively the same as the current move just with a different callout
(ex: "return to loaded beast" and "pop back to loaded beast" are effectively the same as "set loaded beast" so "set loaded beast" would be the alias for these two;
"return to crab" is not necessarily the same as "set static crab" though as you could transition into other movements);
precursor is the required previous movement for the current move
(ex: "left leg scorpion reach" can be done from static beast or loaded beast so a precursor needs to be included;
"continue the switch" doesn't indicate which side so precursor would be needed here too).*/

let basePositions = [
    {
        base: "set static beast",
        imgSrc: "./AF-move-images/placeholder.png"
    },
    {
        base: "set static crab",
        imgSrc: "./AF-move-images/placeholder.png"
    },
    {
        base: "set deep ape",
        imgSrc: "./AF-move-images/placeholder.png"
    },
    {
        base: "set loaded beast",
        imgSrc: "./AF-move-images/placeholder.png"
    }
]

const moveList = [
//Base Positions:
    {
        move: "set static beast",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",      
        level: "1",
        callout: {
            keyPhrase: "set",
            direction: null,
            command: "static beast",
        },  
        nextMoves: [
            "set loaded beast",
            "left leg scorpion reach",
            "right leg scorpion reach",
            "left leg side kickthrough",
            "right leg side kickthrough",
            "left leg underswitch",
            "right leg underswitch",
            "left leg underswitch tap",
            "right leg underswitch tap"
        ]
    },
    {
        move: "set static crab",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: "set",
            direction: null,
            command: "static crab",
        },  
        nextMoves: [
            "left arm crab reach",
            "right arm crab reach",
            "left leg underswitch",
            "right leg underswitch",
            "left leg underswitch tap",
            "right leg underswitch tap",
            "left leg jumping underswitch",
            "right leg jumping underswitch",
            "left leg full scorpion",
            "right leg full scorpion",
            "left leg underswitch to ape",
            "right leg underswitch to ape"
        ]
    },
    {
        move: "set deep ape",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: "set",
            direction: null,
            command: "deep ape",
        },  
        nextMoves: [
            "ape reach",
            "left leg scorpion sweep",
            "right leg scorpion sweep",
            "left leg reaching underswitch",
            "right leg reaching underswitch"
        ]
    },
    {
        move: "set loaded beast",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",      
        level: "1",
        callout: {
            keyPhrase: "set",
            direction: null,
            command: "loaded beast",
        },  
        nextMoves: [
            "loaded beast unload",
            "beast wave unload",
            "left leg beast reach",
            "right leg beast reach",
            "left leg scorpion reach",
            "right leg scorpion reach",
            "left leg front step",
            "right leg front step",
            "left leg front stepthrough",
            "right leg front stepthrough",
            "left leg front kickthrough",
            "right leg front kickthrough",
            "slide to left leg side kickthrough",
            "slide to right leg side kickthrough",
            "slide to left leg underswitch",
            "slide to right leg underswitch"
        ]
    },
//Form Specific Stretches:
    {
        move: "loaded beast unload",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: null,
            direction: null,
            command: "loaded beast unload",
        },    
        nextMoves: [
            "return to loaded beast",
            "left leg front kickthrough",
            "right leg front kickthrough"
        ]
    },
    {
        move: "beast wave unload",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",      
        level: "1",
        callout: {
            keyPhrase: null,
            direction: null,
            command: "beast wave unload",
        },      
        nextMoves: [
            "return to loaded beast"
        ]
    },
    {
        move: "left leg scorpion reach",
        alias: null,
        precursor: "set loaded beast",
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "left leg",
            command: "scorpion reach",
        },      
        nextMoves: [
            "return to loaded beast",
            "left leg beast reach",
            "left leg front step",
            "left leg front stepthrough",
            "continue the switch"      
        ]
    },
    {
        move: "right leg scorpion reach",
        alias: null,
        precursor: "set loaded beast",
        imgSrc: "./AF-move-images/placeholder.png",      
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "right leg",
            command: "scorpion reach",
        },      
        nextMoves: [
            "return to loaded beast",
            "right leg beast reach",  
            "right leg front step",
            "right leg front stepthrough", 
            "continue the switch"    
        ]
    },
    {
        move: "left leg scorpion reach",
        alias: null,
        precursor: "set static beast",
        imgSrc: "./AF-move-images/placeholder.png",    
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "left leg",
            command: "scorpion reach",
        },      
        nextMoves: [
            "return to static beast",
            "continue the switch"  
        ]
    },
    {
        move: "right leg scorpion reach",
        alias: null,
        precursor: "set static beast",
        imgSrc: "./AF-move-images/placeholder.png",    
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "right leg",
            command: "scorpion reach",
        },      
        nextMoves: [
            "return to static beast",
            "continue the switch"     
        ]
    },
    {
        move: "left leg beast reach",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "left leg",
            command: "beast reach",
        },  
        nextMoves: [
            "return to loaded beast",
            "left leg front step",
            "left leg front stepthrough"
        ]
    },
    {
        move: "right leg beast reach",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",  
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "right leg",
            command: "beast reach",
        },  
        nextMoves: [
            "return to loaded beast",
            "right leg front step",
            "right leg front stepthrough"
        ]
    },
    {
        move: "ape reach",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",    
        level: "1",
        callout: {
            keyPhrase: null,
            direction: null,
            command: "ape reach",
        },  
        nextMoves: [
            "set loaded beast",
            "fall back to crab",
            "open"
        ]
    },
    {
        move: "open",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: null,
            direction: null,
            command: "open",
        },  
        nextMoves: [
            "return to ape reach",
            "left leg reaching underswitch",
            "right leg reaching underswitch"
        ] 
    },
    {
        move: "return to ape reach",
        alias: "ape reach",
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",  
        level: "1",
        callout: {
            keyPhrase: "return to",
            direction: null,
            command: "ape reach",
        },  
        nextMoves: [] //will be retrieved from the alias
    }, 
    {
        move: "left arm crab reach",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",   
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "left arm",
            command: "crab reach",
        },  
        nextMoves: [
            "return to crab"
        ]
    },
    {
        move: "right arm crab reach",
        alias: null,
        precursor: null,
        imgSrc: "./AF-move-images/placeholder.png",
        level: "1",
        callout: {
            keyPhrase: null,
            direction: "right arm",
            command: "crab reach",
        },  
        nextMoves: [
            "return to crab"
        ]
    }
//Switches & Transitions:
];

export { basePositions, moveList }
