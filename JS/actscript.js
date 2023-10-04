// ========== ELEMENT CREATOR FUNCTION ==========
function createElementWithAttributes(tag, attributes, innerHTML) {
    const element = document.createElement(tag);
    for (const attribute in attributes) element.setAttribute(attribute, attributes[attribute]);
    if (innerHTML !== undefined) element.innerHTML = innerHTML;
    return element;
};

const board=document.querySelector('.chessboard_container');
pieces.forEach(x=>{
    if(x.includes('p ')){
        if(x.includes('white')) board.appendChild(createElementWithAttributes('div',{class: x, id: 'straight'}));
        else board.appendChild(createElementWithAttributes('div',{class: x, id: 'backward'}));
    }
    else board.appendChild(createElementWithAttributes('div',{class: x}));
})
const background=document.querySelector('.variableBackground');
const boardPieces=document.querySelectorAll('.piece');
let turn='white';
let inActionPiece;
let optionsVisible=false;
let maxRound=30;
let actRound=1;
const actRoundCont=document.querySelector('.act-round');

// ----------------------------- ADD THE AVAILABLE STEPS FUNCTION --------------------------
function addAbleAction(){
    const ables=document.querySelectorAll('.able');
    ables.forEach(x=>x.addEventListener('click',move));
}

// ----------------------------- REMOVE THE ACTUAL AVAILABLE STEPS --------------------------
function removeAbleSquares(){
    const ables=document.querySelectorAll('.able');
    ables.forEach(x=>x.remove());
    const active=document.querySelector('.active');
    if(active) active.remove();
    optionsVisible=false;
}
// ----------------------------- PIECE DETAILS --------------------------
function pieceDetails(piece){
    const pieceClass=piece.getAttribute('class');
    return {posX: pieceClass.slice(-1),posY: pieceClass.slice(pieceClass.indexOf('-',0)+1).slice(0,-2), pColor: (pieceClass.includes('black'))?('black'):('white'), type: pieceClass.slice(13,14)};
}

function move(event){
    const pieceClass=inActionPiece.getAttribute('class'), eventPos=event.target.getAttribute('class').slice(event.target.getAttribute('class').indexOf('square'));
    //inActionPiece.classList.remove(pieceClass.slice(pieceClass.indexOf('square')));
    const capturablePiece=document.querySelector(`.piece.${eventPos}`);

    if((inActionPiece.classList.contains('wp') || inActionPiece.classList.contains('bp')) && (eventPos[7]==0 || eventPos[8]==1)){
        if(inActionPiece.getAttribute('id')==='backward')
            inActionPiece.id='straight';
        else inActionPiece.id='backward';
    }
    
    if(capturablePiece!==null){
        updateCapturedPieces(capturablePiece.getAttribute('class').slice(12,14));
        capturablePiece.remove();
    }
    //inActionPiece.classList.add(eventPos);
    
    inActionPiece.classList.remove(pieceClass.slice(pieceClass.indexOf('square')));
    inActionPiece.style='';
    inActionPiece.classList.add(event.target.getAttribute('class').slice(event.target.getAttribute('class').indexOf('square')));

    turn=(turn==='white')?('black'):('white');
    background.id=turn;
    actRound++;
    /*if(actRoundCont.innerHTML!=Math.ceil(actRound/2)){
        if(Math.ceil(actRound/2)>maxRound)
            boardPieces.forEach(x=>x.removeEventListener('click',stepsPreview));
        actRoundCont.innerHTML=Math.ceil(actRound/2);
    }*/
    removeAbleSquares();
}

// ----------------------------- REMOVE PREVIEW IF CLICK ON NON-PIECE --------------------------
window.addEventListener("click", function(event) { 
    if(!event.target.classList.contains('piece')){
        removeAbleSquares();
    }
});

// ----------------------------- STEPS PREVIEW --------------------------
function stepsPreview(event){
    if(inActionPiece===event.target && optionsVisible){removeAbleSquares(); return;}
    inActionPiece=event.target;
    removeAbleSquares();
    if(!event.target.classList.contains(turn)) return;
    optionsVisible=true;
    const details=pieceDetails(event.target);
    board.append(createElementWithAttributes('div',{class: `active highlighted square-${details.posY}-${details.posX}`}));
    if(details.type==='p'){
        const dir=(event.target.getAttribute('id')==='backward')?(-1):(1);
        for(let i=1;i<=3;i++){
            const possibleC=document.querySelector(`.square-${details.posY-i*dir}-${details.posX}`);
            if(possibleC===null && details.posY-dir*i>=0 && details.posY-dir*i<=11){
                board.append(createElementWithAttributes('div',{class: `able square-${details.posY-dir*i}-${details.posX}`}));
            }
            else break;
        }
        const possibleLeft=document.querySelector(`.square-${details.posY-dir}-${details.posX-1}`);
        const possibleRight=document.querySelector(`.square-${details.posY-dir}-${details.posX-(-1)}`);
        if(possibleLeft!==null && !possibleLeft.classList.contains(details.pColor))
            board.append(createElementWithAttributes('div',{class: `able capturable square-${details.posY-dir}-${details.posX-1}`}));
        if(possibleRight!==null && !possibleRight.classList.contains(details.pColor))
            board.append(createElementWithAttributes('div',{class: `able capturable square-${details.posY-dir}-${details.posX-(-1)}`}));
    }
    else{
        let actRange;
        let actMovement;
        switch(details.type){
            case 'n':
                actRange=knightStepsRange;
                actMovement=knightSteps;
                break;
            case 'b':
                actRange=bishopStepsRange;
                actMovement=bishopSteps;
                break;
            case 'k':
                actRange=kingStepsRange;
                actMovement=queenAndKingSteps;
                break;
            case 'r':
                actRange=rookStepsRange;
                actMovement=rookSteps;
                break;
            case 'q':
                actRange=queenStepsRange;
                actMovement=queenAndKingSteps;
                break;
        }
        for(let j=0;j<actMovement.length;j++){
            for(let i=1;i<=actRange;i++){
                const posX=details.posX-actMovement[j]*i,posY=details.posY-actMovement[j+1]*i;
                if(posX>=0 && posX<=7 && posY>=0 && posY<=11){
                    const possibleC=document.querySelector(`.square-${posY}-${posX}`);
                    if(possibleC!==null){
                        if(!possibleC.classList.contains(details.pColor))
                            board.append(createElementWithAttributes('div',{class: `able capturable square-${posY}-${posX}`}));
                        break;
                    }
                    else board.append(createElementWithAttributes('div',{class: `able square-${posY}-${posX}`}));
                }
                else break;
            }
        }
    }
    addAbleAction();
}
//boardPieces.forEach(x=>x.addEventListener('click',stepsPreview));

let boardLoc= board.getBoundingClientRect();
let pieceWidth=boardLoc.width/8;
board.addEventListener('mousedown',event=>{
    console.log('mousedown');
    const actPiece=event.target;
    if(actPiece.classList.contains('piece')){
        if(pieceDetails(actPiece).pColor===turn){
            inActionPiece=actPiece;
            removeAbleSquares();
            stepsPreview(event);
        }
        else{
            //PLAY WRONG STEP SOUND
        }
    }
})
document.addEventListener('mousemove',event=>{
    console.log(inActionPiece);
    if(inActionPiece){
        console.log('mousemove');
        //console.log(inActionPiece);
        const x = Math.min(boardLoc.width-pieceWidth, Math.max(-1*pieceWidth, event.clientX - boardLoc.left - pieceWidth / 2));
        const y = Math.min(boardLoc.height-pieceWidth, Math.max(-1*pieceWidth, event.clientY - boardLoc.top - pieceWidth / 2));
        console.log(x,y);
        inActionPiece.style.transform = `translate(${x}px, ${y}px)`;
    
        //const pos = getPos(event, containerRect, selectedPiece);
        //document.querySelector('.hover').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.7;`;
    }
    else{

    }
})
document.addEventListener('mouseup',event=>{
    if (inActionPiece) {
        //const pos = getPos(event, containerRect, selectedPiece);
        
        const actPieceDetails=pieceDetails(inActionPiece);
        const pieceClass=inActionPiece.getAttribute('class')
        if (event.target.classList.contains('able')) {
            /*
            inActionPiece.classList.remove(pieceClass.slice(pieceClass.indexOf('square')));
            inActionPiece.style='';
            inActionPiece.classList.add(event.target.getAttribute('class').slice(event.target.getAttribute('class').indexOf('square')));
            */

            console.log('mouseup');
            //console.log(inActionPiece.getAttribute('class'));
            move(event);
            //console.log(inActionPiece.style.transform);
            inActionPiece.removeAttribute('style');
            //console.log(inActionPiece.style.cssText);
            //console.log(inActionPiece.getAttribute('class'));
            inActionPiece.classList.add(event.target.getAttribute('class').slice(event.target.getAttribute('class').indexOf('square')));
            //capture.play();
            //selectedPiece.style.transform = `translate(${pos.x}%, ${pos.y}%)`;
            //document.querySelector('.highlight').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.5;`;
            //document.querySelector('.hover').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.7;`;
            
            // if capture -> remove enemy's figure + append to captured container + add points querySelector('.player-name span')

            //if (selectedPiece.getAttribute('data-piece').charAt(1) === 'p') {
            //    if (selectedPiece.getAttribute('data-direction') === 'up' && pos.y === 0) selectedPiece.setAttribute('data-direction', 'down');
            //    else if (selectedPiece.getAttribute('data-direction') === 'down' && pos.y === boardHeight) selectedPiece.setAttribute('data-direction', 'up');
            //}

            //selectedPiece.style.zIndex = '';
            //selectedPiece.style.cursor = 'grab';
            //selectedPiece = null;
            //playerGo = (playerGo === 'w') ? 'b' : 'w';
            inActionPiece=null;
            //gameBoard.querySelectorAll('.hint').forEach((hint) => hint.remove());
            /*removeAbleSquares();*/
        } else {
            //if(pos.x !== selectedPiecePos.x || pos.y !== selectedPiecePos.y) illegal.play();

            inActionPiece.removeAttribute('style');
            ////document.querySelector('.highlight').style.cssText = `transform: translate(${selectedPiecePos.x}%, ${selectedPiecePos.y}%); opacity: 0.5;`;
            ////document.querySelector('.hover').style.cssText = `transform: translate(${selectedPiecePos.x}%, ${selectedPiecePos.y}%); opacity: 0.7;`;

            //selectedPiece.style.zIndex = '';
            //selectedPiece.style.cursor = 'grab';
            inActionPiece = null;
        }
    }
})
function calcPos(input) {
    const actPieceDetails=pieceDetails(inActionPiece);
    inActionPiece.classList.remove(pieceClass.slice(pieceClass.indexOf('square')));
    inActionPiece.style='';
    //inActionPiece.classList.add(event.target.getAttribute('class').slice(event.target.getAttribute('class').indexOf('square'));
}

// ========== CALC NEW POS ==========
function getPos(event, container, piece) {
    const x = Math.round(Math.min(449, Math.max(-29, event.clientX - container.left - piece.getBoundingClientRect().width / 2)) / 60) * 100;
    const y = Math.round(Math.min(689, Math.max(-29, event.clientY - container.top - piece.getBoundingClientRect().height / 2)) / 60) * 100;
    return { x, y };
}