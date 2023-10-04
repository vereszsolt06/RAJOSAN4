let wPoints=0;
let bPoints=0;
const wPointsInner=document.querySelector('.player_white .points');
const bPointsInner=document.querySelector('.player_black .points');

function updateCapturedPieces(capturedPiece){
    capturedPiecesMap[capturedPiece].count++;
    const actDetails=capturedPiecesMap[capturedPiece];
    if(capturedPiece[0]==='w'){
        wPoints+=actDetails.point;
        wPointsInner.innerHTML=wPoints;
        document.getElementById(`b${actDetails.name}`).classList=`captured captured-b-${actDetails.name}-${actDetails.count}`;
    }
    else{
        bPoints+=actDetails.point;
        bPointsInner.innerHTML=bPoints;
        document.getElementById(`w${actDetails.name}`).classList=`captured captured-w-${actDetails.name}-${actDetails.count}`;
    }
}
