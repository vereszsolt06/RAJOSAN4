const pieces=[
    'piece black br square-0-0',
    'piece black br square-0-7',
    'piece white wr square-11-0',
    'piece white wr square-11-7',

    
    'piece black bn square-0-1',
    'piece black bn square-0-6',
    'piece white wn square-11-1',
    'piece white wn square-11-6',

    
    'piece black bb square-0-2',
    'piece black bb square-0-5',
    'piece white wb square-11-2',
    'piece white wb square-11-5',


    'piece black bq square-0-3',
    'piece black bk square-0-4',
    'piece white wq square-11-3',
    'piece white wk square-11-4',


    'piece black bp square-1-0',
    'piece black bp square-1-1',
    'piece black bp square-1-2',
    'piece black bp square-1-3',
    'piece black bp square-1-4',
    'piece black bp square-1-5',
    'piece black bp square-1-6',
    'piece black bp square-1-7',
    'piece white wp square-10-0',
    'piece white wp square-10-1',
    'piece white wp square-10-2',
    'piece white wp square-10-3',
    'piece white wp square-10-4',
    'piece white wp square-10-5',
    'piece white wp square-10-6',
    'piece white wp square-10-7',
]
const knightSteps=[
    2,1,2,-1,-2,1,-2,-1,2
]
const knightStepsRange=1;

const bishopSteps=[
    1,1,-1,-1,1
]
const bishopStepsRange=8;

const rookSteps=[
    0,1,0,-1,0
]
const rookStepsRange=12;

const queenAndKingSteps=[
    1,1,-1,0,-1,-1,1,0,1
]
const queenStepsRange=12;
const kingStepsRange=2;

let capturedPiecesDefault=[
    {
        id: 'bp',
        name: 'pawn',
        point: 1,
        count: 0
    },
    {
        id: 'bn',
        name: 'knight',
        point: 2,
        count: 0
    },
    {
        id: 'bb',
        name: 'bishop',
        point: 2,
        count: 0
    },
    {
        id: 'br',
        name: 'rook',
        point: 3,
        count: 0
    },
    {
        id: 'bk',
        name: 'king',
        point: 2,
        count: 0
    },
    {
        id: 'bq',
        name: 'queen',
        point: 5,
        count: 0
    },
    {
        id: 'wp',
        name: 'pawn',
        point: 1,
        count: 0
    },
    {
        id: 'wn',
        name: 'knight',
        point: 2,
        count: 0
    },
    {
        id: 'wb',
        name: 'bishop',
        point: 2,
        count: 0
    },
    {
        id: 'wr',
        name: 'rook',
        point: 3,
        count: 0
    },
    {
        id: 'wk',
        name: 'king',
        point: 2,
        count: 0
    },
    {
        id: 'wq',
        name: 'queen',
        point: 5,
        count: 0
    }
]

let capturedPiecesMap={};
for(let i=0;i<capturedPiecesDefault.length;i++){
    capturedPiecesMap[capturedPiecesDefault[i].id]=capturedPiecesDefault[i];
}