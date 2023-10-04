

/* PETIKE */

const containerRect = board.getBoundingClientRect();

let selectedPiece = null;
let selectedPiecePos;
let playerGo = 'w';
let actPieceSize = 64.5;
console.log(actPieceSize);
board.addEventListener('mousedown', (event) => {
    event.preventDefault();
    const clickedElement = event.target;
    if (clickedElement.classList.contains('piece') /*&& clickedElement.getAttribute('data-piece').charAt(0) === playerGo*/) {
        selectedPiece = clickedElement;

        const pos = getPos(event, containerRect, selectedPiece);
        
        //ocument.querySelector('.highlight').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.5;`;
        //ocument.querySelector('.hover').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.7;`;
        
        selectedPiecePos = pos;
        selectedPiece.style.zIndex = 100;
        selectedPiece.style.cursor = 'grabbing';

        board.querySelectorAll('.able').forEach((hint) => hint.remove());
        stepsPreview(event);
    } else {
        //document.querySelector('.highlight').style.cssText = `opacity: 0;`;
        //document.querySelector('.hover').style.cssText = `opacity: 0;`;
        selectedPiece = null;
    }
});

document.addEventListener('mousemove', (event) => {
    if (selectedPiece) {
        const x = Math.min(board.width, Math.max(-actPieceSize/2, event.clientX - containerRect.left - selectedPiece.getBoundingClientRect().width / 2));
        const y = Math.min(board.height, Math.max(-actPieceSize/2, event.clientY - containerRect.top - selectedPiece.getBoundingClientRect().height / 2));
        selectedPiece.style.transform = `translate(${x}px, ${y}px)`;
        
        //const pos = getPos(event, containerRect, selectedPiece);
        //document.querySelector('.hover').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.7;`;
    }
});

document.addEventListener('mouseup', (event) => {
    if (selectedPiece) {
        const pos = getPos(event, containerRect, selectedPiece);
        if (event.target.classList.contains('.able')) {
            //capture.play();
            console.log('rajosan5');
            selectedPiece.style.transform = `translate(${pos.x}%, ${pos.y}%)`;
            //document.querySelector('.highlight').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.5;`;
            //document.querySelector('.hover').style.cssText = `transform: translate(${pos.x}%, ${pos.y}%); opacity: 0.7;`;
            
            // if capture -> remove enemy's figure + append to captured container + add points querySelector('.player-name span')


            selectedPiece.style.zIndex = '';
            selectedPiece.style.cursor = 'grab';
            selectedPiece = null;
            playerGo = (playerGo === 'w') ? 'b' : 'w';

            board.querySelectorAll('.hint').forEach((hint) => hint.remove());
        } else {
            //if(pos.x !== selectedPiecePos.x || pos.y !== selectedPiecePos.y) illegal.play();

            selectedPiece.style.transform = `translate(${selectedPiecePos.x}%, ${selectedPiecePos.y}%)`;
           // document.querySelector('.highlight').style.cssText = `transform: translate(${selectedPiecePos.x}%, ${selectedPiecePos.y}%); opacity: 0.5;`;
//            document.querySelector('.hover').style.cssText = `transform: translate(${selectedPiecePos.x}%, ${selectedPiecePos.y}%); opacity: 0.7;`;

            selectedPiece.style.zIndex = '';
            selectedPiece.style.cursor = 'grab';
            selectedPiece = null;
        }
    }
});

function getPos(event, container, piece) {
    const x = Math.round(Math.min(containerRect.height, Math.max(-actPieceSize/2, event.clientX - container.left - piece.getBoundingClientRect().width / 2)) / actPieceSize) * 100;
    const y = Math.round(Math.min(containerRect.width, Math.max(-actPieceSize/2, event.clientY - container.top - piece.getBoundingClientRect().height / 2)) / actPieceSize) * 100;
    return { x, y };
}
function calcPos(input) {
    const translateX = 800 - parseInt(input[0]) * 100;
    const translateY = 1200 - parseInt(input[1] + input[2]) * 100;
    return `transform: translate(${translateX}%,${translateY}%)`;
}
//avatar input
//move history on the right side
/*
pieces.forEach((piece) => {
    for (let i = 0; i < piece.position.length; i++){
        const figure = createElementWithAttributes('div', { class: 'piece', 'data-piece': piece.name, style: calcPos(piece.position[i]), draggable: true });
        document.querySelector('.game-board').append(figure);
    }
});*/ 